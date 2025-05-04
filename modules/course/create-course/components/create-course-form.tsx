"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";

// Components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloudUpload, Loader2Icon, Paperclip } from "lucide-react";

// File uploader components
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput
} from "@/components/ui/file-upload";
import { Divider } from "@/components/ui/divider";
import { useRouter } from "next/navigation";
import { createCourseSchema } from "@/schema/course/create-course-schema";
import { useMutation } from "@tanstack/react-query";
import { createCourseEntry } from "@/actions/course/create-course";

// Constants
const MAX_FILES = 5;
const MAX_FILE_SIZE = 1024 * 1024 * 9; // 9MB
const ALLOWED_FILE_TYPES = {
  "documents/*": [".pdf", ".doc", ".docx", ".txt", ".md"],
  "images/*": [".jpg", ".jpeg", ".png", ".gif", ".svg"],
  "application/pdf": [".pdf"],
  "application/msword": [".doc", ".docx"]
};

const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" }
];

// Types
type FormValues = z.infer<typeof createCourseSchema>;

export default function CourseForm({ courseName }: { courseName: string }) {
  const [files, setFiles] = useState<File[] | null>(null);
  const router = useRouter();

  // Dropzone configuration
  const dropZoneConfig = {
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
    accept: ALLOWED_FILE_TYPES
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      mainOutcome: "",
      currentLevel: "",
      notes: "",
      name: courseName
    }
  });

  const { mutate: createCourse, isPending } = useMutation({
    mutationFn: createCourseEntry,
    onSuccess: () => {
      toast.success("Course created successfully with AI modules!", {
        id: "create-course",
      });
      router.push("/home");
    },
    onMutate: () => {
      toast.loading("Creating course", {
        id: "create-course",
      });
    },
    onError: (error) => {
      toast.error("Failed to create course. Please try again.", {
        id: "create-course",
      });
      console.error("Course creation error:", error);
    }
  })

  function onSubmit(values: FormValues) {
    try {
      if (files) {
        console.log("Number of files:", files.length);
        files.forEach((file, index) => {
          console.log(`File ${index}:`, file.name, file.type, file.size);
        });
      } else {
        console.log("No files selected");
      }

      // Create a FormData object for proper file handling
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("mainOutcome", values.mainOutcome);
      formData.append("currentLevel", values.currentLevel);
      
      // Add each file individually
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("notes", file);
        });
      }

      // Convert FormData to a plain object for the server action
      const formDataObj = {
        name: values.name,
        mainOutcome: values.mainOutcome,
        currentLevel: values.currentLevel,
        notes: files // Pass the actual files array
      };

      createCourse(formDataObj);

      // Reset form
      form.reset();
      setFiles(null);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Heading className="mb-6">Create Course <span className="text-xl text-sky-500 underline">{courseName}</span></Heading>
      <Divider className="my-6" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Main Outcome Field */}
        <div className="space-y-2">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="mainOutcome"
                className="block text-base font-semibold text-zinc-950 mb-4 dark:text-white"
              >
                Main Outcome
              </label>
              <Input
                id="mainOutcome"
                placeholder="e.g., get a job, pass an exam, build a project"
                {...form.register("mainOutcome")}
              />
              {form.formState.errors.mainOutcome && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.mainOutcome.message}
                </p>
              )}
              <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">
                What is the main goal of this course?
              </p>
            </div>
          </div>
        </div>

        {/* Current Level Field */}
        <div className="space-y-2">
          <div>
            <label
              htmlFor="currentLevel"
              className="block mb-4 text-base font-semibold text-zinc-950 dark:text-white"
            >
              Current level
            </label>
            <Select
              id="currentLevel"
              {...form.register("currentLevel")}
              defaultValue=""
            >
              <option value="" disabled>Select your current level</option>
              {SKILL_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </Select>
            {form.formState.errors.currentLevel && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.currentLevel.message}
              </p>
            )}
          </div>
        </div>

        {/* File Upload Field */}
        <div className="space-y-2">
          <div>
            <label className="block text-base font-semibold text-zinc-950 mb-4 dark:text-white">
              Add notes or resources (if any)
            </label>
            <FileUploader
              value={files}
              onValueChange={setFiles}
              dropzoneOptions={dropZoneConfig}
              className="relative bg-background rounded-lg p-2"
            >
              <FileInput
                id="fileInput"
                className="outline-dashed outline-1 outline-slate-500"
              >
                <div className="flex items-center justify-center flex-col p-8 w-full">
                  <CloudUpload className="text-gray-500 w-10 h-10" />
                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                    &nbsp; or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG, PDF or DOC (Max {MAX_FILES} files, {MAX_FILE_SIZE / (1024 * 1024)}MB each)
                  </p>
                </div>
              </FileInput>
              <FileUploaderContent>
                {files &&
                  files.length > 0 &&
                  files.map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <Paperclip className="h-4 w-4 stroke-current" />
                      <span className="text-ellipsis overflow-hidden">{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
            <Textarea
              id="notes"
              placeholder="Any additional notes about your learning goals or needs..."
              className="mt-4"
              value=""
              onChange={() => {}}
              resizable
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-between">
          <Button
            outline
            onClick={() => router.push("/home")}
          >
            Back
          </Button>
          <Button
            type="submit"
            color="sky"
            disabled={isPending}
          >
            {isPending ? <Loader2Icon className="w-4 h-4 animate-spin" /> : "Create Course"}
          </Button>
        </div>
      </form>
    </div>
  );
}