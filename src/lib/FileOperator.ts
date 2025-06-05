import { existsSync, mkdirSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import path from "path";

export class FileOperator {
    private filePath: string = "";

    constructor(private file: File) {}

    async store(): Promise<void> {
        const bytes = await this.file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        this.filePath = path.join(process.cwd(), "storage", `${Date.now()}${this.file.name}`);

        try {
            if(!existsSync(path.dirname("storage"))) {
                mkdirSync(path.dirname("storage"), { recursive: true })
            }

            await writeFile(this.filePath, buffer);
        }catch(e) {
            console.error("Error writing file:", e);
            throw new Error("Failed to store the file.");
        }
    }

    async extractRandomPhrases(): Promise<string[]> {
        console.log(`Extracting random phrases from ${this.filePath}`);

        if(existsSync(this.filePath)) {
            const content = await readFile(this.filePath, "utf8");
            const phrases = content.split(".");

            //randomly select 10% of the phrases
            const extractedPhrases = new Map<number, string>();
            
            const numberOfPhrases = Math.floor(10*phrases.length/100);
            for(let i = 0; i < numberOfPhrases; i++) {
                const randomIndex = Math.floor(Math.random() * phrases.length);
                const phrase = phrases[randomIndex].trim();
                if(phrase && !extractedPhrases.has(randomIndex)) {
                    extractedPhrases.set(randomIndex, phrase);
                }
            }

            return extractedPhrases.values().toArray();
        }

        return [];
    }
}