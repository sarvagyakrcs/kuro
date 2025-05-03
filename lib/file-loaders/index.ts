import * as fs from 'fs';
import * as path from 'path';
import { extractTextFromPowerPoint } from './ppt-loader';
import { extractTextFromTxt } from './txt-loader';
import { extractTextFromMarkdown } from './markdown-loader';
import { extractTextFromCsv } from './csv-loader';
import { extractTextFromDocx } from './docs-loader';
import { extractTextFromPdf } from './pdf-loader';
/**
 * Generic function to extract text from various document types based on file extension.
 * 
 * @param filePath - The path to the document file
 * @returns A promise that resolves to a string containing the extracted text
 * @throws Error if the file format is unsupported or extraction fails
 */
export async function extractTextFromDocument(filePath: string): Promise<string> {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File does not exist: ${filePath}`);
      }
      
      const extension = path.extname(filePath).toLowerCase();
      
      switch (extension) {
        case '.pdf':
          return await extractTextFromPdf(filePath);
        
        case '.docx':
        case '.doc':
          return await extractTextFromDocx(filePath);
        
        case '.pptx':
        case '.ppt':
          return await extractTextFromPowerPoint(filePath);
        
        case '.txt':
          return await extractTextFromTxt(filePath);
        
        case '.md':
        case '.markdown':
          return await extractTextFromMarkdown(filePath);
        
        case '.csv':
          return await extractTextFromCsv(filePath);
        
        default:
          throw new Error(`Unsupported file format: ${extension}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error extracting text: ${error.message}`);
      }
      throw new Error('Unknown error occurred while extracting text');
    }
  }
  