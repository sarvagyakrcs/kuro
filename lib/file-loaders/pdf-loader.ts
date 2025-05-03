import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import * as fs from 'fs';
import * as path from 'path';

/**
 * Extracts text content from a PDF file and returns it as a single string.
 * 
 * @param pdfPath - The file path to the PDF document
 * @returns A promise that resolves to a string containing all the text content from the PDF
 * @throws Error if the file doesn't exist or cannot be processed
 */
export async function extractTextFromPdf(pdfPath: string): Promise<string> {
    try {
      // Verify that the file exists and is a PDF
      if (!fs.existsSync(pdfPath)) {
        throw new Error(`File does not exist: ${pdfPath}`);
      }
      
      if (path.extname(pdfPath).toLowerCase() !== '.pdf') {
        throw new Error(`File is not a PDF: ${pdfPath}`);
      }
      
      // Create a PDFLoader instance from LangChain
      const loader = new PDFLoader(pdfPath);
      
      // Load and parse the PDF
      const docs = await loader.load();
      
      // Combine all page contents into a single string
      const fullText = docs.map(doc => doc.pageContent).join('\n\n');
      
      return fullText;
    } catch (error) {
      // Re-throw errors with additional context
      if (error instanceof Error) {
        throw new Error(`Error extracting text from PDF: ${error.message}`);
      }
      throw new Error('Unknown error occurred while extracting text from PDF');
    }
  }
  