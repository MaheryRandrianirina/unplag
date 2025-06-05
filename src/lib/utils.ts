import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalize(phrase: string): string {
  return phrase
    .toLowerCase()
    .replace(/[^\w]/g, "") // Remove all non-word characters
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .replace(/[\n\r]+/g, " ") // Replace newlines and carriage returns with a space
    .trim();
}

export function Lemmanize(text: string, lang: "en"|"fr" = "en"): string {
  if(lang === "en") {

  }
  return text; // For now, just return the original phrase.
}
