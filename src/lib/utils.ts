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
    
    return responseJson["organic_results"];
  }catch(e){
    console.error("Error during Google search:", e);
    return [];
  }
}

