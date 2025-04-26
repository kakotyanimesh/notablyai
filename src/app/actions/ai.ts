
import { createClient } from "@/auth/server";
import errorHandler from "@/lib/errorhandler";
import prisma from "@/lib/prisma";
import { summarystartingPrompt } from "@/lib/prpmpts";
import { GoogleGenAI } from "@google/genai";

const geminiClient = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY})

const client = await createClient()

const { data : {user}} = await client.auth.getUser()


export const summaryAI =async (noteText : string) => {
    try {
        

        if(!user){
            throw "You are not authorized to make this req , signin first"
        }

        if(noteText.length === 0 || !noteText){
            return {summary : ""}
        }

        const notesPrompt = summarystartingPrompt(noteText)

        const response = await geminiClient.models.generateContentStream({
            model : "gemini-2.0-flash",
            contents : notesPrompt
        })

        let summary : string | undefined;
        for await (const chunks  of response) {
            summary += chunks.text!
        }

        if(!summary) {
            throw {errorInfo : "Something went wrong try again "}
        }

        return summary

    } catch (error) {
        console.log(error, "asdasd");
        
        return errorHandler(error)
    }
}


export const askAIquestion = async (questions : string[], responses : string[], id : number) => {
    try {
        if(!user){
            throw "Unauthorized error"
        }

        const notes = await prisma.notes.findUnique({
            where : {
                id : id,
                userId : user.id
            },
            select : {
                data : true
            }
        })

        if(notes?.data.length === 0){
            return {errorHandler : "You don't have any notes here"}
        }

        const message : Chatcm
    } catch (error) {
        return errorHandler(error)
    }
}