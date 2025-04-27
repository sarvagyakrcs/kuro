"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/validations/auth"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LockKeyhole, Mail, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/lib/auth-context"

type LoginFormValues = {
  email: string
  password: string
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { login } = useAuth()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    try {
      await login(data.email, data.password)
      
      toast({
        title: "Success!",
        description: "You've successfully logged in.",
      })

      // Navigation is handled by the auth context
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="min-w-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Login to Kuro
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        placeholder="name@example.com"
                        className={cn(
                          "pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-gray-500",
                          "transition-all duration-200 hover:bg-white/10",
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className={cn(
                          "pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-gray-500",
                          "transition-all duration-200 hover:bg-white/10",
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="text-sm text-right">
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-500 hover:to-gray-500 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-[0_0_15px_rgba(100,116,139,0.5)] hover:shadow-[0_0_25px_rgba(100,116,139,0.7)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 mt-2">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-black/30 px-2 text-white/60 backdrop-blur-sm">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white">
            Google
          </Button>
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white">
            GitHub
          </Button>
        </div>
        <div className="text-center text-sm text-white/60 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-gray-400 hover:text-gray-300 transition-colors">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}
