"use server"

import { Module } from "@prisma/client";
import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import getNotesWithAi from "./get-notes";

export async function generateNotes(module: Module) {
  // Get similar notes for context
  const { context } = await getNotesWithAi(module);

  // Stream detailed markdown content using Groq
  const stream = streamText({
    model: groq("llama3-70b-8192"),
    system: `You are an expert educational content creator. 
    Your task is to create comprehensive, well-structured markdown notes for a course module.
    The content should be detailed, include code examples where relevant, and follow best practices for educational content.
    Use headings, subheadings, lists, code blocks, and other markdown features to create an engaging learning experience.`,
    prompt: `Create detailed, comprehensive educational notes in markdown format for a module with the following details:

Module Name: ${module.name}
Module Type: ${module.moduleType}
Description: ${module.description}

Here is some additional context from similar modules that might be helpful:
${context}

The notes should:
1. Begin with a clear introduction explaining the topic's importance
2. Include detailed explanations of all relevant concepts
3. Provide practical examples and code snippets where appropriate
4. End with a summary and next steps or practice suggestions
5. Use proper markdown formatting with headers, lists, code blocks, etc.
6. Be comprehensive and thorough, covering all aspects of the topic

Your response should be ready-to-use markdown content.`,
    temperature: 0.7,
    maxTokens: 6000,
  });

  return stream;
} 