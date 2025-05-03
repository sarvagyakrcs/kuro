import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/db/prisma";
import { embeddingModel } from "@/lib/embedding-model";
import { embed } from "ai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, moduleId } = await req.json();
    
    if (!moduleId) {
      return NextResponse.json({ error: 'Module ID is required' }, { status: 400 });
    }
    
    // Get the module from the database
    const module = await prisma.module.findUnique({
      where: { id: moduleId }
    });
    
    if (!module) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }
    
    // Get similar notes for context
    const { embedding } = await embed({
      model: embeddingModel,
      value: module.name + " " + module.description + " " + module.moduleType
    });
    
    const similarNotes = await prisma.$queryRaw`
      SELECT "name", "url", "summary",
      1 - ("summaryEmbedding" <=> ${embedding}::vector) AS CosineSimilarity
      FROM "CourseAttachment"
      ORDER BY CosineSimilarity DESC
      LIMIT 2
    ` as { name: string, url: string, summary: string, CosineSimilarity: number }[];
    
    const context = similarNotes.map(note => note.summary).join("\n\n");
    
    // Stream detailed markdown content using Groq
    const result = streamText({
      model: groq("llama3-70b-8192"),
      system: `You are an expert educational content creator who creates clean, well-structured markdown notes.
      You write ONLY valid markdown without any explanatory text or introduction before or after the content.
      Never include meta-text like "Here are notes for..." or "These are comprehensive notes on...".
      Start immediately with a level 1 heading (# Title) and proceed with content.
      Do not include any pre-text or post-text explaining what you've created.`,
      prompt: `Create detailed educational notes in markdown format for a module on "${module.name}".

Additional context:
- Module type: ${module.moduleType}
- Description: ${module.description}

Include:
- Clear introductory section explaining importance
- Detailed explanations of all key concepts
- Practical examples and code snippets where appropriate
- Summary section with next steps
- Use proper markdown with headers, lists, code blocks
- Be comprehensive and thorough

Similar material for reference:
${context}

IMPORTANT: Start immediately with a markdown heading. Do not include ANY text before the heading like "Here are notes on..." or "These comprehensive notes cover...". Just start with the # heading directly.`,
      temperature: 0.5,
      maxTokens: 4000,
    });

    // Return the data stream response
    return result.toDataStreamResponse();
    
  } catch (error) {
    console.error("Error generating completion:", error);
    return NextResponse.json({ error: 'Failed to generate completion' }, { status: 500 });
  }
} 