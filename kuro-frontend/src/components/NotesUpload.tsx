
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, File, X, Check } from 'lucide-react';
import { analyzeNotes } from '@/lib/api';

interface NotesUploadProps {
  topic: string;
  questions: string[];
  onComplete: (analyzedContent: any) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

const NotesUpload: React.FC<NotesUploadProps> = ({ topic, questions, onComplete }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(2, 11),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading' as const
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      
      // Simulate upload progress for each file
      newFiles.forEach(file => {
        const interval = setInterval(() => {
          setFiles(currentFiles => 
            currentFiles.map(f => {
              if (f.id === file.id) {
                const newProgress = f.progress + Math.random() * 10;
                
                if (newProgress >= 100) {
                  clearInterval(interval);
                  return { ...f, progress: 100, status: 'complete' };
                }
                
                return { ...f, progress: newProgress };
              }
              return f;
            })
          );
        }, 300);
      });
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleProcessFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "No Files",
        description: "Please upload at least one file to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);

    try {
      // Simulate API call for notes analysis
      const analysisResult = await analyzeNotes(topic, questions, files);
      
      // Complete the progress
      clearInterval(interval);
      setProcessingProgress(100);
      
      setTimeout(() => {
        onComplete(analysisResult);
        setIsProcessing(false);
      }, 1000);
    } catch (error) {
      clearInterval(interval);
      setIsProcessing(false);
      toast({
        title: "Processing Error",
        description: "Failed to analyze notes. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-md border border-white/10 bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-tr from-primary to-primary/70 rounded-lg p-2">
            <Upload className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Upload Your Notes</h2>
            <p className="text-sm text-muted-foreground">
              Upload notes, documents, or resources for "{topic}"
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg p-8
              flex flex-col items-center justify-center space-y-2
              cursor-pointer transition-all
              ${files.length > 0 
                ? 'border-primary/30 bg-primary/5' 
                : 'border-white/10 hover:border-white/20 bg-secondary/30'}
            `}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-medium">Drop files here or click to upload</p>
              <p className="text-sm text-muted-foreground">
                Support for PDF, TXT, DOCX, and Markdown files
              </p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.txt,.doc,.docx,.md" 
              multiple
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3 animate-fade-in">
              <h3 className="text-sm font-medium">Uploaded Files</h3>
              <div className="space-y-2">
                {files.map(file => (
                  <div key={file.id} className="flex items-center justify-between rounded-md border border-white/10 p-2 bg-secondary/30">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="bg-muted rounded p-1.5">
                        <File className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {file.status === 'uploading' ? (
                        <div className="flex items-center space-x-2 w-24">
                          <Progress value={file.progress} className="h-1" />
                          <span className="text-xs text-muted-foreground">{Math.round(file.progress)}%</span>
                        </div>
                      ) : file.status === 'complete' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <span className="text-xs text-destructive">Error</span>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.id);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Processing Status */}
          {isProcessing && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Analyzing notes with Kuro AI...</span>
                <span>{Math.round(processingProgress)}%</span>
              </div>
              <Progress value={processingProgress} className="h-1.5" />
              <p className="text-xs text-muted-foreground italic">This process will extract key concepts and align them with your learning goals</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-white/10 pt-4">
        <div className="w-full flex justify-end">
          <Button 
            onClick={handleProcessFiles} 
            disabled={files.length === 0 || isProcessing}
            className="gap-2"
          >
            {isProcessing ? "Processing..." : "Process Files"} 
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NotesUpload;
