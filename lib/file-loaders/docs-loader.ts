import * as fs from 'fs';
import * as path from 'path';
import * as mammoth from 'mammoth';

/**
 * Extracts text content from a DOCX file and returns it as a string.
 * 
 * @param docxPath - The file path to the DOCX document
 * @returns A promise that resolves to a string containing all the text content
 * @throws Error if the file doesn't exist or cannot be processed
 */
export async function extractTextFromDocx(docxPath: string): Promise<string> {
    try {
        // Verify that the file exists and is a DOCX
        if (!fs.existsSync(docxPath)) {
            throw new Error(`File does not exist: ${docxPath}`);
        }

        const extension = path.extname(docxPath).toLowerCase();
        if (extension !== '.docx' && extension !== '.doc') {
            throw new Error(`File is not a DOCX/DOC: ${docxPath}`);
        }

        // Read the file buffer
        const buffer = fs.readFileSync(docxPath);

        // Convert to HTML and then extract text
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error extracting text from DOCX: ${error.message}`);
        }
        throw new Error('Unknown error occurred while extracting text from DOCX');
    }
}

