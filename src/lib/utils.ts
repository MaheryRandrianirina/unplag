import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalize(phrase: string): string {
  return phrase
    .toLowerCase()
    .replace(/[\n\r]+/g, " ") // Replace newlines and carriage returns with a space
    .replace(/\b(?:a|an|the|and|or|but|is|are|was|were|be|to|of|in|that|it|this|for|on|with)\b/g, "") // remove stopwords
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim();
}

export function Lemmanize(text: string, lang: "en"|"fr" = "en"): string {
  if(lang === "en") {

  }
  return text; // For now, just return the original phrase.
}
