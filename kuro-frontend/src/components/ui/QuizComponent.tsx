
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { FileQuestion, CheckCircle, XCircle, ArrowDown } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizComponentProps {
  title: string;
  questions: Question[];
  onComplete?: (score: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  title,
  questions,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  
  const handleOptionSelect = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
  };
  
  const checkAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerChecked(true);
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      onComplete?.(correctAnswers);
    }
  };
  
  const getOptionClassName = (index: number) => {
    if (!isAnswerChecked) {
      return selectedOption === index ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20";
    }
    
    if (index === currentQuestion.correctAnswer) {
      return "border-green-500 bg-green-500/10";
    }
    
    if (index === selectedOption && selectedOption !== currentQuestion.correctAnswer) {
      return "border-destructive bg-destructive/10";
    }
    
    return "border-white/10 opacity-50";
  };

  return (
    <Card className="border border-white/10 shadow-md bg-card/70 backdrop-blur-sm">
      <CardHeader className="border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-tr from-primary to-primary/70 rounded-lg p-2">
              <FileQuestion className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-medium">{title}</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-1 mt-2" />
      </CardHeader>
      
      {!isCompleted ? (
        <>
          <CardContent className="py-5">
            <div className="space-y-5">
              <h4 className="text-lg font-medium">{currentQuestion.question}</h4>
              
              <RadioGroup 
                value={selectedOption?.toString()} 
                className="space-y-3"
                onValueChange={(val) => handleOptionSelect(parseInt(val))}
              >
                {currentQuestion.options.map((option, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex items-center rounded-md border p-3 transition-all cursor-pointer relative",
                      getOptionClassName(idx)
                    )}
                    onClick={() => handleOptionSelect(idx)}
                  >
                    <RadioGroupItem value={idx.toString()} id={`option-${idx}`} className="mr-3" />
                    <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                    
                    {isAnswerChecked && idx === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    )}
                    
                    {isAnswerChecked && idx === selectedOption && idx !== currentQuestion.correctAnswer && (
                      <XCircle className="h-4 w-4 text-destructive ml-2" />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-white/10 pt-4">
            {!isAnswerChecked ? (
              <Button 
                onClick={checkAnswer} 
                disabled={selectedOption === null} 
                className="w-full"
              >
                Check Answer
              </Button>
            ) : (
              <Button onClick={nextQuestion} className="w-full">
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
              </Button>
            )}
          </CardFooter>
        </>
      ) : (
        <CardContent className="py-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-medium">Quiz Completed!</h3>
            <p className="text-muted-foreground">
              You scored {correctAnswers} out of {questions.length} questions correctly.
            </p>
            <div className="py-3">
              <div className="flex justify-between text-sm mb-2">
                <span>Score</span>
                <span>{Math.round((correctAnswers / questions.length) * 100)}%</span>
              </div>
              <Progress value={(correctAnswers / questions.length) * 100} className="h-2" />
            </div>
            <Button className="gap-2" onClick={() => window.location.reload()}>
              Retake Quiz <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default QuizComponent;
