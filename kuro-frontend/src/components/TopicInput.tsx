
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, ArrowDown, Plus } from 'lucide-react';
import { generateQuestions } from '@/lib/api';

interface TopicInputProps {
  onComplete: (topic: string, questions: string[]) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ onComplete }) => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Fake progress updates to simulate AI processing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newValue = prev + Math.random() * 15;
        return newValue >= 100 ? 100 : newValue;
      });
    }, 600);
    
    try {
      // Simulated API call
      const generatedQuestions = await generateQuestions(topic, description);
      setQuestions(generatedQuestions);
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setIsProcessing(false);
      }, 500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive"
      });
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  const handleComplete = () => {
    if (questions.length > 0) {
      onComplete(topic, questions);
    } else {
      toast({
        title: "Questions Required",
        description: "Please generate questions before continuing.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-md border border-white/10 bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-tr from-primary to-primary/70 rounded-lg p-2">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Create New Course</h2>
            <p className="text-sm text-muted-foreground">Let Kuro AI help you generate a custom learning path</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="questions" disabled={questions.length === 0}>Questions</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4 mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Course Topic</Label>
                <Input 
                  id="topic" 
                  placeholder="e.g. Machine Learning Fundamentals" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Brief Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Add details about what you'd like to learn..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isProcessing}
                  className="resize-none h-24"
                />
              </div>
              
              {isProcessing && (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Generating learning path...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              )}
              
              <Button 
                type="submit" 
                disabled={isProcessing || !topic.trim()} 
                className="w-full"
              >
                {isProcessing ? "Processing..." : "Generate Learning Path"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="questions" className="space-y-4 mt-4 min-h-[200px]">
            <div className="space-y-4">
              <div className="border border-white/10 rounded-md p-4 bg-secondary/30">
                <h3 className="font-medium mb-2">Generated Questions</h3>
                <ul className="space-y-3">
                  {questions.map((question, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="bg-primary/20 text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-muted-foreground">{question}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-white/10 pt-4">
        {questions.length > 0 && (
          <div className="w-full flex justify-end">
            <Button onClick={handleComplete} className="gap-2">
              Continue to Upload <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default TopicInput;
