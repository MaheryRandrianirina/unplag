import { FileOperator } from "../src/lib/FileOperator";
import { describe, expect, test } from "@jest/globals";
import { readFile } from "fs";
import path from "path";

describe("test fileoperator methods", ()=>{
    test("extract 5 sentences from 50 sentences in a file", async()=>{
        const filepath = path.join(process.cwd(),"storage", "test.txt");
        const fo = new FileOperator(null, filepath);
        const randomPhrases =  await fo.extractRandomPhrases();

        expect(randomPhrases).toHaveLength(5)
    })
})