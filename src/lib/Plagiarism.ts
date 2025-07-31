import sanitize from "sanitize-html";
import { GoogleSearchResult } from "../../types/googleSearch";
import { FileOperator } from "./FileOperator";
import { NLP } from "./NLP";
import { googleSearch } from "./utils";

export class Plagiarism {

    async check(file: File) {
        const fo = new FileOperator(file);
        await fo.store();
        const randomPhrases = await fo.extractRandomPhrases();
        
        const nlp = new NLP(randomPhrases);
        const phrases = nlp.prepare();
        
        const searchResults = await this.#search(phrases)
        if(searchResults.length === 0) {
            return this.#result();
        }

        const webPagesContentForEachSentence = await this.#scrapeWebsites(searchResults);
        webPagesContentForEachSentence.forEach(async(sentenceContents) => {
            await sentenceContents
        })
    }

    /**
     * google search
     * 
     * @param phrases 
     */
    async #search(phrases: string[]) {
        const results: GoogleSearchResult[][] = await Promise.all(phrases.map(sentence => googleSearch(sentence)));
        //const results = await Promise.all([googleSearch(phrases[0])]) as GoogleSearchResult[]; // for testing purposes

        return results;
    }

    #result(){
        return {}
    }

    /**
     * scrape websites and check for plagiarism
     * 
     * @param searchResults 
     */
    async #scrapeWebsites(searchResults: GoogleSearchResult[][]) {
        return searchResults.map(async(results) => {
            const sliced = results.slice(0, 5); // take only the first 5 results
            const promiseResponse = await Promise.allSettled(sliced.map(result => fetch(result.link)));
            let newScrappingToDo = 0;

            const pagesContent = promiseResponse.map(async(res) => {
                if(res.status === "fulfilled") {
                    return sanitize(await res.value.text());
                }

                // increment the number of webscrapping to do after fail
                newScrappingToDo++;

                return null;
            })

            // proceed to {newScrappingToDo} new scrappings
            const newPromiseResponse = await Promise.allSettled(results.slice(5, newScrappingToDo)
                .map(result => fetch(result.link)));
            const newPagesContent = newPromiseResponse.map(async(res) => {
                if(res.status === "fulfilled") {
                    return sanitize(await res.value.text());
                }

                return null;
            })

            return [...pagesContent, ...newPagesContent]
        })
    }
}