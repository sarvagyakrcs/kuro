"use server"
import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import QuizModule from "../client-components/quiz-module"
import { Module } from "@prisma/client"
import { generateQuizFromModule } from "../actions/generate-quiz"

interface QuizModuleProps {
  module: Module
}

const QuizModuleServer = async ({ module }: QuizModuleProps) => {
  // Fetch the quiz with all related questions and options
  const moduleWithQuiz = await prisma.module.findUnique({
    where: {
      id: module.id,
    },
    include: {
      quiz: {
        include: {
          questions: {
            include: {
              options: true
            },
            orderBy: {
              id: 'asc'
            }
          }
        }
      }
    }
  })

  // fetch the course as well
  const course = await prisma.course.findUnique({
    where: {
      id: module.courseId,
    },
  })

  // If no quiz exists, generate one with AI and save to the database
  if (!moduleWithQuiz || !moduleWithQuiz.quiz) {
    if (!course) {
      notFound()
    }
    
    // Generate quiz and save to database
    const createdQuiz = await generateQuizFromModule(module, course)
    
    // Refetch the module with the newly created quiz
    const updatedModuleWithQuiz = await prisma.module.findUnique({
      where: {
        id: module.id,
      },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                options: true
              },
              orderBy: {
                id: 'asc'
              }
            }
          }
        }
      }
    })
    
    if (!updatedModuleWithQuiz || !updatedModuleWithQuiz.quiz) {
      notFound()
    }
    
    return <QuizModule quiz={updatedModuleWithQuiz.quiz} />
  }

  return <QuizModule quiz={moduleWithQuiz.quiz} />
}

export default QuizModuleServer 