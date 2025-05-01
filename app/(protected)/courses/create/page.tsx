"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { PROJECT_NAME } from "@/metadata";
import CreateCourseForm from "@/modules/course/create-course/components/create-course-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCoursePage() {
  const [name, setName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis hiding?",
    "Write a JavaScript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  return (
    currentStep === 0 ? (
      <div className="h-[40rem] flex flex-col justify-center items-center px-4">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          Ask {PROJECT_NAME} AI Anything
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    ) : currentStep === 1 ? (
      <CreateCourseForm courseName={name} />
    ) : null
  );
}
