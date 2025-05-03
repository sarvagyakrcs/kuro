import * as fs from 'fs';
import * as path from 'path';
/**
 * Extracts text content from a Markdown file and returns it as a string.
 * 
 * @param mdPath - The file path to the Markdown document
 * @returns A promise that resolves to a string containing all the text content
 * @throws Error if the file doesn't exist or cannot be processed
 */
export async function extractTextFromMarkdown(mdPath: string): Promise<string> {
    try {
      // Verify that the file exists and is an MD file
      if (!fs.existsSync(mdPath)) {
        throw new Error(`File does not exist: ${mdPath}`);
      }
      
      const extension = path.extname(mdPath).toLowerCase();
      if (extension !== '.md' && extension !== '.markdown') {
        throw new Error(`File is not a Markdown document: ${mdPath}`);
      }
      
      // Markdown files are just text files, so we can read them directly
      const content = fs.readFileSync(mdPath, 'utf-8');
      return content;
      
      // Note: If you want to strip Markdown formatting, you can use a Markdown parser
      // like 'marked' and then extract just the text content.
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error extracting text from Markdown: ${error.message}`);
      }
      throw new Error('Unknown error occurred while extracting text from Markdown');
    }
  }