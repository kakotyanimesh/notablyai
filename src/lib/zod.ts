import { z } from "zod"


export const signinObject = z.object({
    email : z.string().email({message : "Provide a valid email address"}),
    password : z.string()
                .max(25, {message : "Password length should be within 25"})
                .min(8, "Password must be at least 8 characters long")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})

export const signupObject = z.object({
    email    : z.string().email({message : "Provide a valid email address"}),
    password : z.string()
                .max(25, {message : "Password length should be within 25"})
                .min(8, "Password must be at least 8 characters long")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    username  : z.string().max(20, {message : "Username length should be within 20"}) 
})