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
        
        const results = this.#search(phrases)
    }

    /**
     * google search
     * 
     * @param phrases 
     */
    async #search(phrases: string[]) {
        const results: null|GoogleSearchResult[][] = await Promise.all(phrases.map(sentence => googleSearch(sentence)));
        //const results = await Promise.all([googleSearch(phrases[0])]) as GoogleSearchResult[]; // for testing purposes

        return results;
    }
}