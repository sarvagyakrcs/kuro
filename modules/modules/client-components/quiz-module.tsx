"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading, Subheading } from "@/components/ui/heading"
import { Text, Strong } from "@/components/ui/text"
import { Divider } from "@/components/ui/divider"
import { SparkleIcon } from "@/components/ui/sparkle-icon"
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, ArrowLeft, CheckSquare } from "lucide-react"
import { Quiz, Question, Option } from "@prisma/client"

type QuizWithQuestionsAndOptions = Quiz & {
  questions: (Question & {
    options: Option[]
  })[]
}

type Props = {
  quiz: QuizWithQuestionsAndOptions
  onComplete?: (score: number, total: number) => void
}

const QuizModule = ({ quiz, onComplete }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const totalQuestions = quiz.questions.length
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1
  
  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (isSubmitted) return
    
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setIsSubmitted(true)
      setShowResults(true)
      
      // Calculate score
      const score = calculateScore()
      if (onComplete) {
        onComplete(score, totalQuestions)
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1))
  }

  const isAnswerCorrect = (questionId: string, selectedOptionId: string) => {
    const question = quiz.questions.find(q => q.id === questionId)
    if (!question) return false
    
    const selectedOption = question.options.find(o => o.id === selectedOptionId)
    return selectedOption?.correct || false
  }

  const getCorrectOptionForQuestion = (questionId: string) => {
    const question = quiz.questions.find(q => q.id === questionId)
    if (!question) return null
    
    return question.options.find(o => o.correct)
  }

  const calculateScore = () => {
    return Object.entries(selectedOptions).reduce((score, [questionId, optionId]) => {
      const isCorrect = isAnswerCorrect(questionId, optionId)
      return isCorrect ? score + 1 : score
    }, 0)
  }

  const isOptionSelected = (questionId: string) => {
    return Boolean(selectedOptions[questionId])
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOptions({})
    setIsSubmitted(false)
    setShowResults(false)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="space-y-1">
              <Badge color="red" className="mb-1 sm:mb-2">
                <SparkleIcon className="mr-1 size-3 sm:size-4" />
                <span>Quiz</span>
              </Badge>
              <Heading level={2} className="text-base sm:text-xl font-bold">{quiz.title}</Heading>
              {quiz.description && (
                <Text className="text-sm text-zinc-500 dark:text-zinc-400">{quiz.description}</Text>
              )}
            </div>
            <Badge color="zinc" className="self-start rounded-full px-2 sm:px-3 py-1 text-xs">
              <CheckSquare className="mr-1 size-3" />
              <span>{totalQuestions} {totalQuestions === 1 ? 'Question' : 'Questions'}</span>
            </Badge>
          </div>

          <Divider />

          {showResults ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center size-16 rounded-full bg-zinc-100 dark:bg-zinc-800">
                    {calculateScore() === totalQuestions ? (
                      <CheckCircle2 className="size-8 text-emerald-500" />
                    ) : calculateScore() >= totalQuestions / 2 ? (
                      <CheckCircle2 className="size-8 text-amber-500" />
                    ) : (
                      <AlertCircle className="size-8 text-red-500" />
                    )}
                  </div>
                  <div>
                    <Heading level={3} className="text-lg sm:text-xl">Quiz Completed!</Heading>
                    <Text className="mt-2 text-zinc-500 dark:text-zinc-400">
                      You scored <Strong>{calculateScore()}</Strong> out of <Strong>{totalQuestions}</Strong> questions
                    </Text>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                    <Button
                      onClick={resetQuiz}
                      color="sky"
                      className="rounded-full px-4 py-2 text-sm"
                    >
                      <span className="flex items-center gap-1.5">
                        Take Quiz Again <ArrowLeft className="size-4" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Heading level={3} className="text-lg">Question Review</Heading>
                
                {/* Correct Answers Section */}
                <div className="rounded-lg border border-emerald-200 p-4 bg-emerald-50/30 dark:border-emerald-800 dark:bg-emerald-950/10 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-5 text-emerald-500" />
                      <Strong className="text-emerald-700 dark:text-emerald-500">All Correct Answers</Strong>
                    </div>
                    <Divider className="my-2" />
                    <div className="grid gap-3">
                      {quiz.questions.map((question, index) => {
                        const correctOption = question.options.find(o => o.correct)
                        
                        return (
                          <div key={`correct-${question.id}`} className="space-y-1">
                            <div className="flex gap-2 items-start">
                              <Strong className="inline-block size-5 flex-shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 text-center">
                                {index + 1}
                              </Strong>
                              <Text className="text-sm font-medium">{question.question}</Text>
                            </div>
                            <div className="ml-7 flex items-center gap-2">
                              <CheckCircle2 className="size-4 text-emerald-500" />
                              <Text className="text-sm">{correctOption?.option}</Text>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Detailed Question Review */}
                {quiz.questions.map((question, index) => (
                  <div 
                    key={question.id}
                    className="rounded-lg border border-zinc-200 p-3 sm:p-4 dark:border-zinc-800"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3 items-start">
                          <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                            <Strong>{index + 1}</Strong>
                          </div>
                          <Text className="font-medium">{question.question}</Text>
                        </div>
                        {isAnswerCorrect(question.id, selectedOptions[question.id]) ? (
                          <Badge color="emerald" className="ml-2">Correct</Badge>
                        ) : (
                          <Badge color="red" className="ml-2">Incorrect</Badge>
                        )}
                      </div>

                      <div className="ml-11 grid gap-2">
                        {question.options.map(option => {
                          const isSelected = selectedOptions[question.id] === option.id
                          const isCorrect = option.correct
                          
                          return (
                            <div 
                              key={option.id}
                              className={`flex items-center gap-2 rounded-md border p-2 ${
                                isSelected && isCorrect 
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-700' 
                                  : isSelected && !isCorrect
                                    ? 'border-red-500 bg-red-50 dark:bg-red-950/20 dark:border-red-700'
                                    : isCorrect
                                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10 dark:border-emerald-800'
                                      : 'border-zinc-200 dark:border-zinc-800'
                              }`}
                            >
                              {isSelected && isCorrect && (
                                <CheckCircle2 className="size-4 text-emerald-500" />
                              )}
                              {isSelected && !isCorrect && (
                                <XCircle className="size-4 text-red-500" />
                              )}
                              {!isSelected && isCorrect && (
                                <CheckCircle2 className="size-4 text-emerald-500" />
                              )}
                              {!isSelected && !isCorrect && (
                                <div className="size-4" />
                              )}
                              <Text className={`text-sm ${
                                isCorrect ? 'font-medium' : ''
                              }`}>{option.option}</Text>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <Badge color="zinc" className="rounded-full px-3 py-1 text-xs">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                      <Strong className="text-red-700 dark:text-red-300">{currentQuestionIndex + 1}</Strong>
                    </div>
                    <Text className="font-medium">{currentQuestion.question}</Text>
                  </div>

                  <div className="ml-11 grid gap-2">
                    {currentQuestion.options.map(option => (
                      <motion.div 
                        key={option.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <button
                          onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                          className={`w-full text-left flex items-center gap-2 rounded-md border p-3 transition-colors ${
                            selectedOptions[currentQuestion.id] === option.id
                              ? 'border-primary bg-primary/5 dark:bg-primary/10 dark:border-primary/80'
                              : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'
                          }`}
                        >
                          <div className={`flex size-5 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                            selectedOptions[currentQuestion.id] === option.id
                              ? 'bg-primary text-white'
                              : 'bg-zinc-100 dark:bg-zinc-800'
                          }`}>
                            {String.fromCharCode(65 + currentQuestion.options.indexOf(option))}
                          </div>
                          <Text className="text-sm">{option.option}</Text>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    color="light"
                    className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                  >
                    <span className="flex items-center gap-1.5">
                      <ArrowLeft size={16} /> Previous
                    </span>
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!isOptionSelected(currentQuestion.id)}
                    color="sky"
                    className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                  >
                    <span className="flex items-center gap-1.5">
                      {isLastQuestion ? 'Finish' : 'Next'} <ChevronRight size={16} />
                    </span>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizModule 