"use server"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import * as z from "zod"
import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail"
import { LoginSchema } from "@/schema/auth/login-schema"
import { GetUserByEmail } from "../user"
import { RegisterSchema, RegisterSchemaType } from "@/schema/auth/register-schema"
import {prisma} from "@/lib/db/prisma"
import bcrypt from "bcryptjs"
import { getVerificationTokenByToken } from "../token"

export const signInProvider = async (provider: 'google' | 'github' | 'twitter' | 'linkedin') => {
    try {
        if(provider === 'twitter'){
            await signIn("twitter");
            return;
        }
        await signIn(provider);
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error("Incorrect Username or Password!")

                    case "UntrustedHost":
                        throw new Error("Untrusted host")
                    case "AccessDenied":
                        throw new Error("Please Verify Your Email to Login.")
            
                default:
                    throw new Error("Something Went Wrong!")
            }
        }
        throw error;
    }
    return {success: "Succeccfully Logged In"}
};

export const Login = async (credentials : z.infer<typeof LoginSchema>) => {
    const {
        data,
        success
    } = LoginSchema.safeParse(credentials)
    
    if(!success){
        throw new Error("Invalid Data")
    }

    const {
        email,
        password
    } = data;

    const existingUser = await GetUserByEmail(email);

    if(!existingUser || !existingUser.email){
        throw new Error("User not found.")
    }

    if(!existingUser.password){
        throw new Error("Password is not set for this user.")
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        sendVerificationEmail(verificationToken.email, verificationToken.token)
        return {
            "success" : "Verification Email Sent.",
            success_status: true
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error("Incorrect Username or Password!")

                    case "UntrustedHost":
                        throw new Error("Untrusted host")
                    case "AccessDenied":
                        throw new Error("Please Verify Your Email to Login.")
            
                default:
                    throw new Error("Something Went Wrong!")
            }
        }
        throw error;
    }

    return {
        "success" : "Email Sent!",
        success_status:true
    }
}


export const Register = async (credentials : RegisterSchemaType) => {
    const {
        success,
        data
    } = RegisterSchema.safeParse(credentials)

    if(!success){
        throw new Error('Invalid Data!')
    }

    const user = await GetUserByEmail(data.email);
    if(user){
        await prisma.verificationToken.deleteMany({
            where: {
                email: data.email
            }
        })
        const verificationToken = await generateVerificationToken(data.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return {
            success: "Verification Email Sent.",
        }
        
    }

    const db = prisma;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await db.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            role: "USER",
            firstName: data.firstName,
            lastName: data.lastName
        }
    })

    const verificationToken = await generateVerificationToken(data.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {
        'success' : 'Confirmation Email Sent!.'
    }
}

export const newVerification = async(token: string) => {
    const db = prisma;
    const existing_token = await getVerificationTokenByToken(token);

    if(!existing_token){
        throw new Error("Invalid Token")
    }
    const hasExpired = new Date() > new Date(existing_token.expires);

    if(hasExpired){
        throw new Error("Token Expired")
    }

    const user = await GetUserByEmail(existing_token.email);

    if(!user){
        throw new Error("User not found")
    }

    await db.user.update({
        where: {
            id: user.id
        },
        data:{
            emailVerified: new Date(),
            email: user.email
        }
    })

    await db.verificationToken.delete({
        where: {
            id: existing_token.id,
        }
    })

    return {
        success: "Email Verified"
    }
}