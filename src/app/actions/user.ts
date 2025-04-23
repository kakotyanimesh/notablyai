'use server'

import { createClient } from "@/auth/server"
import errorHandler from "@/lib/errorhandler"
import prisma from "@/lib/prisma"
import { signinObject, signupObject } from "@/lib/zod"
// import { userClient } from "@/middleware"



export const logInUser = async ({email, password} : {
    email : string,
    password : string
}) => {

    try {
        const parsedObject = signinObject.safeParse({email, password})

        if(!parsedObject.success){
            return {errorInfo : `${JSON.stringify(parsedObject.error.errors[0].message)}`}
        }   

    
        const { email : ValidEmail, password : ValidPassword} = parsedObject.data;
        const { auth } = await createClient()

        const { error } = await auth.signInWithPassword({
            email : ValidEmail,
            password : ValidPassword
        })

        if(error){
            throw error
        }

        return {errorInfo : null}
    } catch (error) {
        return errorHandler(error)
    }
}

 
export const signupUser = async ({email, password, username } : {
    email : string,
    password : string,
    username : string
}) => {
    

    try {
        const parsedObject = signupObject.safeParse({email, password, username})

        if(!parsedObject.success){
            console.log(JSON.stringify(parsedObject.error?.errors[0].message));

            return {errorInfo : `${JSON.stringify(parsedObject.error?.errors[0].message)}`}
            
        }
        

        const {email : ValidEmail, password : ValidPassword, username : ValidUsername } = parsedObject.data

        const { auth } = await createClient()

        // const hasedPassword = await bcrypt.hash()

        const { data, error} = await auth.signUp({
            email : ValidEmail,
            password : ValidPassword,
        })

        if(error) throw error

        const userId = data.user?.id

        if(!userId) throw new Error("Error while supabase signup")

        

        await prisma.user.create({
            data : {
                id : userId,
                email : ValidEmail,
                username : ValidUsername,
            }
        })

        return {errorInfo : null}

    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if((error as any).code === "P2002"){
            return {errorInfo : "user already exits with username or password "}
        }
        return errorHandler(error)
    }
}


export const logOutUser = async () => {
    try {
        const { auth } = await createClient()

        const {error} = await auth.signOut()

        if(error) throw error

        
        return {errorInfo : null}
    } catch (error) {
        return errorHandler(error)
    }
}


export const getNotes = async () => {
    try {
        const client = await createClient()

        const {data : {user}} = await client.auth.getUser()

        const notes = await prisma.notes.findMany({
            where : {
                userId : user?.id as string
            }
        })

        return notes 

    } catch (error) {
        return errorHandler(error)
    }
}