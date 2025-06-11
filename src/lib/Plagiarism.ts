import { FileOperator } from "./FileOperator";
import { NLP } from "./NLP";

export class Plagiarism {
    async check(file: File) {
        const fo = new FileOperator(file);
        await fo.store();
        const randomPhrases = await fo.extractRandomPhrases();
        
        const nlp = new NLP(randomPhrases);
        const lemmaPhrases = nlp.lemmatize();
    }
}