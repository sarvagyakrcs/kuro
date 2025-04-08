"use client"
import React from "react";
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { useState } from 'react'
import { IconUser } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import FormSignIn from "../forms/login/form";
import { Session } from "next-auth";
import UserButton from "./user-button";

type Props = {
  type: "form" | "modal";
  modalLabel ?: "text" | "icon" | "both"
  authenticated ?: "user-button" | "disappear"
  session ?: Session | null
};

const SignInForm = ({ type, modalLabel, session, authenticated }: Props) => {
  if ((authenticated === "disappear" || authenticated === undefined) && session?.user?.id) return null

  if(authenticated === "user-button" && session?.user?.id) {
    return (
      <UserButton session={session} />
    )
  }

  const [isOpen, setIsOpen] = useState(false)

  if (type === "form") {
    return <FormSignIn />
  }
  if (type === "modal") {
    return (
      <>
        <Button className={cn(modalLabel === "icon" && "p-2 rounded-full")} type="button" onClick={() => setIsOpen(true)}>
          {
            modalLabel === "text" ? "Login" :
            modalLabel === "icon" ? (
              <IconUser size={20} />
            ) : (
              <div className="flex items-center gap-2">
                <IconUser size={20} />
                Login
              </div>
            )
          }
        </Button>
        <Dialog className="mt-14" open={isOpen} onClose={setIsOpen}>
          <FormSignIn />
        </Dialog>
      </>
    );
  }
};

export default SignInForm;
