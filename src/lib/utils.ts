import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Parser } from "htmlparser2"
import { ChildNode, DomHandler } from "domhandler"
import { getJson } from "serpapi"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalize(phrase: string): string {
  return phrase
    .toLowerCase()
    .replace(/[\n\r]+/g, " ") // Replace newlines and carriage returns with a space
    .replace(/\b(?:a|an|the|there|and|or|but|is|'s|are|was|were|be|to|of|in|that|it|this|for|on|with)\b/g, "") // remove stopwords
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim();
}

export async function googleSearch(query: string) {
  try {
    const responseJson = await getJson({
      engine: "google",
      q: query,
      api_key: process.env.SERPAPI_KEY,
      location: "United States",
    })
    
    console.log(responseJson["organic_results"]);
    return responseJson["organic_results"];
  }catch(e){
    console.error("Error during Google search:", e);
    return [];
  }
}

function getRandomAgent(): string {
  const agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
  ];

  return agents[Math.floor(Math.random() * agents.length)];
}

function parse(html: string) {
  return new Promise<ChildNode[]>((resolve, reject) => {
    const handler = new DomHandler((error, dom) => {
      if (error) {
        reject(error);
      } else {
        resolve(dom);
      }
    });

    const parser = new Parser(handler, { decodeEntities: true });
    parser.write(html);
    parser.end();
  });
}
