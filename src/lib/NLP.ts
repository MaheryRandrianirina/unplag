import { franc } from "franc"
import { normalize } from "./utils";
import nlp from "compromise";
import nlpFr from "fr-compromise";


export class NLP {

    private language: "eng"|"fra" = "eng";

    constructor(private text: string[]) {
        if(Array.isArray(text)) {
            this.language = franc(text[0], { only: ["fra", "eng"]}) as "eng"|"fra";
        }
    }

    lemmatize() {
        this.text = this.text.map(sentence => {
            const doc = this.language === "eng" ? nlp(sentence) : nlpFr(sentence);
            doc.compute("root")
            
            return doc.terms().json().map((item: any) => ( item.terms[0].root || item.terms[0].normal)).join(" ")
        });

        return this.text;
    }
}