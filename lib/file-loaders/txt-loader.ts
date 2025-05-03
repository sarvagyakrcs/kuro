import * as fs from 'fs';

/**
 * Extracts text content from a plain text file and returns it as a string.
 * 
 * @param txtPath - The file path to the TXT document
 * @returns A promise that resolves to a string containing all the text content
 * @throws Error if the file doesn't exist or cannot be processed
 */
export async function extractTextFromTxt(txtPath: string): Promise<string> {
    try {
      // Verify that the file exists
      if (!fs.existsSync(txtPath)) {
        throw new Error(`File does not exist: ${txtPath}`);
      }
  
      // Read the file as utf-8 text
      const content = fs.readFileSync(txtPath, 'utf-8');
      return content;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error extracting text from TXT: ${error.message}`);
      }
      throw new Error('Unknown error occurred while extracting text from TXT');
    }
  }