import { FileOperator } from "@/lib/FileOperator";
import { NLP } from "@/lib/NLP";
import { Plagiarism } from "@/lib/Plagiarism";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }
    
    const result = await (new Plagiarism()).check(file)
    
    
    return NextResponse.json({
        success: true,
        message: "File successfully processed.",
      });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json({
        success: false,
        message: "An error occurred while processing the file.",
        error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}