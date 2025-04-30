"use client";
import React from "react";
import { IconBrandGithub, IconBrandGoogle, IconLoader } from "@tabler/icons-react";
import { Field, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PROJECT_NAME } from "@/metadata";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {Login} from "@/actions/auth";
import { LoginSchema, LoginSchemaType } from "@/schema/auth/login-schema";
import toast from "react-hot-toast";

export default function FormSignIn() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const {
    mutate: login,
    isPending
  } = useMutation({
    mutationKey: ['register'],
    mutationFn: Login,
    onMutate: () => {
      toast.loading("Logging you in", { id: "login" })
    },
    onSuccess: () => {
      reset();
      toast("Logged in successfully", { id: "login" })
    },
    onError: (error) => {
      toast(error.message, { id: "login" })
    }
  })

  const onSubmit = (data: LoginSchemaType) => {
    login(data);
  };
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none p-4 md:p-8">
      <h2 className="text-xl font-bold">Welcome back to {PROJECT_NAME}</h2>
      <p className="mt-2 max-w-sm text-sm">
        Login to your precious {PROJECT_NAME.toLocaleLowerCase()} account and start your journey.
      </p>
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Field className="my-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email", { required: "Email is required" })}
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
          />
          {errors.email && (
            <p className="dark:text-red-300 text-red-800 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </Field>
        <Field className="my-4">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            id="password"
            placeholder="••••••••"
            type="password"
          />
          {errors.password && (
            <p className="dark:text-red-300 text-red-800 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </Field>
        <Button disabled={isPending} type="submit" className="w-full cursor-pointer mt-6">
          { isPending ? <IconLoader size={22} className="animate-spin" />: "Sign in" }
        </Button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex w-full items-center justify-between space-x-4">
          <Button disabled={isPending} className="w-full cursor-pointer" outline>
            {" "}
            <IconBrandGoogle size={22} />{" "}
          </Button>
          <Button disabled={isPending} className="w-full cursor-pointer" outline>
            {" "}
            <IconBrandGithub size={22} />{" "}
          </Button>
        </div>
      </form>
    </div>
  );
}
