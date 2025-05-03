import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';

/**
 * Extracts content from a CSV file and returns it as a string.
 * 
 * @param csvPath - The file path to the CSV document
 * @param delimiter - Optional delimiter character (default is ',')
 * @returns A promise that resolves to a string containing all the text content
 * @throws Error if the file doesn't exist or cannot be processed
 */
export async function extractTextFromCsv(csvPath: string, delimiter: string = ','): Promise<string> {
    try {
      // Verify that the file exists and is a CSV
      if (!fs.existsSync(csvPath)) {
        throw new Error(`File does not exist: ${csvPath}`);
      }
      
      if (path.extname(csvPath).toLowerCase() !== '.csv') {
        throw new Error(`File is not a CSV: ${csvPath}`);
      }
      
      // Read the file
      const fileContent = fs.readFileSync(csvPath, 'utf-8');
      
      // Parse the CSV
      const results = Papa.parse(fileContent, {
        delimiter: delimiter,
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
      });
      
      if (results.errors && results.errors.length > 0) {
        throw new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`);
      }
      
      // Convert to a simple concatenated string
      let textContent = '';
      
      // Add headers as the first line
      if (results.meta.fields && results.meta.fields.length > 0) {
        textContent += results.meta.fields.join(' ') + '\n\n';
      }
      
      // Add each row of data
      results.data.forEach((row: any) => {
        const rowValues = results.meta.fields!.map(field => {
          const value = row[field];
          return value !== null && value !== undefined ? String(value) : '';
        });
        textContent += rowValues.join(' ') + '\n';
      });
      
      return textContent;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error extracting text from CSV: ${error.message}`);
      }
      throw new Error('Unknown error occurred while extracting text from CSV');
    }
  }