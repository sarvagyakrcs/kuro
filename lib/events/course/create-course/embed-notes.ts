import { prisma } from "@/lib/db/prisma";
import { embeddingModel } from "@/lib/embedding-model";
import { extractTextFromDocument } from "@/lib/file-loaders";
import { embed } from "ai";
import { writeFile, mkdir, rm } from "fs/promises";
import path from "path";

// Function to generate a comprehensive summary of document content
async function generateSummaryWithAI(text: string, filename: string): Promise<string> {
  try {
    console.log(`Generating detailed summary for ${filename}, text length: ${text.length}`);
    
    // Limit text length for API processing
    const MAX_SUMMARY_TEXT_LENGTH = 10000;
    const textToSummarize = text.substring(0, MAX_SUMMARY_TEXT_LENGTH);
    
    // Handle empty or very short text
    if (!textToSummarize || textToSummarize.length < 100) {
      console.log("Text too short for summarization");
      return text.substring(0, 500) + "...";
    }
    
    // Create detailed summary prompt
    const fileExtension = filename.split('.').pop()?.toLowerCase() || '';
    const systemPrompt = "You are an expert educational content summarizer. Create a detailed, comprehensive summary that captures all key concepts, definitions, examples, and insights from the document.";
    const userPrompt = `Generate a detailed and comprehensive summary (400-500 words) of the following educational content. Include all major topics, key points, and important details that would be valuable for a course: ${textToSummarize}`;
    
    // Call Groq API with retry logic
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "qwen-qwq-32b",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ],
            max_tokens: 800,
            temperature: 0.2
          })
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.choices?.[0]?.message?.content) {
          const summary = result.choices[0].message.content.trim();
          if (summary.length > 100) {
            console.log(`Generated detailed summary (${summary.length} chars)`);
            return summary;
          }
          throw new Error("Summary too short");
        }
        throw new Error("Invalid API response format");
      } catch (error) {
        attempts++;
        console.error(`Summary generation attempt ${attempts} failed:`, error);
        
        if (attempts < maxAttempts) {
          const delay = attempts * 2;
          console.log(`Retrying in ${delay} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay * 1000));
        }
      }
    }
    
    // Fallback if all attempts fail
    return text.substring(0, 500) + "...";
  } catch (error) {
    console.error("Error in generateSummaryWithAI:", error);
    return text.substring(0, 500) + "...";
  }
}

// Helper function to generate a shorter file path
function generateShortFilePath(originalFileName: string): string {
  // Create a hash of the filename to ensure uniqueness but shorter length
  const timestamp = Date.now();
  const fileExtension = originalFileName.split('.').pop() || '';
  // Take just first 8 chars of filename + timestamp for uniqueness
  const shortName = originalFileName.substring(0, Math.min(8, originalFileName.length));
  return `${shortName}-${timestamp}.${fileExtension}`;
}

// Function to safely generate embedding for a summary with retry capability
export async function safelyCreateSummaryEmbedding(summary: string): Promise<number[]> {
  const MAX_SUMMARY_LENGTH = 8000; // Maximum length for summary to avoid errors
  
  // Ensure summary isn't too large for the embedding model
  const truncatedSummary = summary.length > MAX_SUMMARY_LENGTH ? 
    summary.substring(0, MAX_SUMMARY_LENGTH) : summary;
  
  console.log(`Creating embedding for summary (${truncatedSummary.length} chars)`);
  
  // Try up to 3 times to generate embedding
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    try {
      const { embedding } = await embed({
        model: embeddingModel,
        value: truncatedSummary
      });
      
      console.log(`Successfully generated embedding for summary`);
      return embedding;
    } catch (error) {
      attempts++;
      console.error(`Error generating summary embedding (attempt ${attempts}):`, error);
      
      if (attempts < maxAttempts) {
        // Exponential backoff
        const delayMs = Math.pow(2, attempts) * 1000;
        console.log(`Retrying in ${delayMs/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  
  throw new Error(`Failed to generate embedding for summary after ${maxAttempts} attempts`);
}

export const embedSingleFile = async (file: File, attachmentId: string) => {
    try {
        // save locally with shorter filename
        const shortFileName = generateShortFilePath(file.name);
        const uploadsDir = path.resolve(process.cwd(), "uploads");
        const filePath = path.join(uploadsDir, shortFileName);

        const fileDir = path.dirname(filePath);
        await mkdir(fileDir, { recursive: true });

        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);

        const deleteFile = async () => {
            try {
                await rm(filePath);
                console.log(`Deleted ${filePath}`);
            } catch (error) {
                console.error(`Error deleting ${filePath}:`, error);
            }
        };

        // Extract text from document
        console.log(`Extracting text from ${file.name}...`);
        let text = "";
        try {
            text = await extractTextFromDocument(filePath);
        } catch (error) {
            console.error(`Error extracting text from ${file.name}:`, error);
            return { filePath, deleteFile };
        }

        if (!text || text.length === 0) {
            console.error("No text extracted from document");
            return { filePath, deleteFile };
        }
        
        console.log(`Successfully extracted ${text.length} characters from ${file.name}`);

        // Check if attachment exists
        const attachment = await prisma.courseAttachment.findUnique({
            where: { id: attachmentId }
        });

        if (!attachment) {
            console.error(`Attachment with ID ${attachmentId} not found`);
            return { filePath, deleteFile };
        }

        // Generate detailed summary with AI
        console.log("Generating detailed summary of document...");
        const summary = await generateSummaryWithAI(text, file.name);
        console.log(`Generated summary (${summary.length} chars)`);

        // Embed only the summary
        try {
            console.log("Embedding summary...");
            const embedding = await safelyCreateSummaryEmbedding(summary);

            // Save only the summary and its embedding to the database
            await prisma.$executeRaw`
                UPDATE "CourseAttachment"
                SET "summaryEmbedding" = ${embedding}::vector,
                    "summary" = ${summary}
                WHERE "id" = ${attachmentId}
            `;
            
            console.log(`Successfully stored summary and embedding for attachment ${attachmentId}`);
            
        } catch (error) {
            console.error("Error generating or saving summary embedding:", error);
        }
        
        return { filePath, deleteFile };
    } catch (error) {
        console.error("Error in embedSingleFile:", error);
        // Return a dummy object to prevent further errors
        return { 
            filePath: "", 
            deleteFile: async () => { console.log("No file to delete"); } 
        };
    }
}

// Use embedSingleFile for both single files and multiple chunks
// Function name kept for backward compatibility
export const embedMultipleChunks = embedSingleFile;