"use server"

import { Course, Module } from "@prisma/client"
import { prisma } from "@/lib/db/prisma"
import { groq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"

// Define Zod schemas for validation
const OptionSchema = z.object({
  text: z.string(),
  isCorrect: z.boolean()
})

const QuestionSchema = z.object({
  question: z.string(),
  options: z.array(OptionSchema).length(3) // Ensure exactly 3 options per question
})

const QuizSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(QuestionSchema).min(3).max(20) // Between 3 and 20 questions
})

export async function generateQuizFromModule(module: Module, course: Course) {
  try {
    console.log(`Generating quiz for module: ${module.name}`)
    
    // Extract relevant content from module and course for context
    const moduleContent = module.content || ""
    const moduleDescription = module.description || ""
    const courseName = course.name
    const courseDescription = course.description || ""
    const courseOutcomes = course.outcome || ""
    
    // Generate quiz content with Groq using AI SDK's generateObject
    const { object: quizData } = await generateObject({
      model: groq("llama3-70b-8192"),
      schema: QuizSchema,
      system: `You are an expert educational assessment creator. Your task is to create a comprehensive quiz based on the provided module and course data. 
      Create questions that test understanding of key concepts, application of knowledge, and critical thinking.
      For each question, create 3 options with EXACTLY ONE correct answer.`,
      prompt: `Create a comprehensive quiz for the following module in a course:

Module Name: ${module.name}
Module Type: ${module.moduleType}
Module Description: ${moduleDescription}
Module Content: ${moduleContent.substring(0, 2000)}

Course Context:
Course Name: ${courseName}
Course Description: ${courseDescription}
Course Outcomes: ${courseOutcomes}

Create around 20 questions (or fewer if the content doesn't warrant that many) that thoroughly test knowledge of this module.
Each question should have EXACTLY 3 options, with EXACTLY 1 correct answer per question.
Ensure the questions cover all important concepts from the module.
Vary the difficulty levels of questions from basic recall to application and analysis.`,
      temperature: 0.2,
      maxTokens: 4000,
    })
    
    // Save quiz to database
    const quiz = await prisma.quiz.create({
      data: {
        title: quizData.title,
        description: quizData.description || "",
        moduleId: module.id,
        questions: {
          create: quizData.questions.map(q => ({
            question: q.question,
            options: {
              create: q.options.map(o => ({
                option: o.text,
                correct: o.isCorrect
              }))
            }
          }))
        }
      },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    })
    
    console.log(`Created quiz with ID: ${quiz.id}`)
    return quiz
    
  } catch (error) {
    console.error("Error generating quiz:", error)
    throw new Error("Failed to generate quiz. Please try again later.")
  }
} 