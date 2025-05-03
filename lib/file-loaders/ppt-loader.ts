import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

/**
 * Extracts text content from a PowerPoint (PPTX/PPT) file and returns it as a string.
 * 
 * @param pptPath - The file path to the PowerPoint document
 * @returns A promise that resolves to a string containing all the text content
 * @throws Error if the file doesn't exist or cannot be processed
 */
export async function extractTextFromPowerPoint(pptPath: string): Promise<string> {
    try {
      // Verify that the file exists and is a PPT/PPTX
      if (!fs.existsSync(pptPath)) {
        throw new Error(`File does not exist: ${pptPath}`);
      }
      
      const extension = path.extname(pptPath).toLowerCase();
      if (extension !== '.pptx' && extension !== '.ppt') {
        throw new Error(`File is not a PowerPoint presentation: ${pptPath}`);
      }
      
      // Read the file
      const workbook = XLSX.readFile(pptPath);
      
      // Extract text from all sheets/slides
      let fullText = '';
      
      workbook.SheetNames.forEach((sheetName, index) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Add slide number/title
        fullText += `Slide ${index + 1}: ${sheetName}\n`;
        
        // Add slide content
        jsonData.forEach((row: any) => {
          if (row && row.length) {
            fullText += row.filter(Boolean).join(' ') + '\n';
          }
        });
        
        fullText += '\n'; // Add spacing between slides
      });
      
      return fullText;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error extracting text from PowerPoint: ${error.message}`);
      }
      throw new Error('Unknown error occurred while extracting text from PowerPoint');
    }
  }
  