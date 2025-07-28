"use server";
import { createClient } from "@/auth/server";
import errorHandler from "@/lib/errorhandler";
import { summarystartingPrompt } from "@/lib/prpmpts";
import { GoogleGenAI } from "@google/genai";

export const summaryAI = async ({ noteText }: { noteText: string }) => {
  try {
    const geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const client = await createClient();

    const {
      data: { user },
    } = await client.auth.getUser();

    if (!user) {
      throw "You are not authorized to make this req , signin first";
    }

    if (noteText.length === 0 || !noteText) {
      return { summary: "" };
    }

    const notesPrompt = summarystartingPrompt(noteText);

    const response = await geminiClient.models.generateContent({
      model: "gemini-2.0-flash",
      contents: notesPrompt,
    });

    const summmary = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    
    return summmary;
  } catch (error) {
    console.log(error, "asdasd");

    return errorHandler(error);
  }
};

// export const askAIquestion = async (questions : string[], responses : string[], id : number) => {
//     try {
//         if(!user){
//             throw "Unauthorized error"
//         }

//         const notes = await prisma.notes.findUnique({
//             where : {
//                 id : id,
//                 userId : user.id
//             },
//             select : {
//                 data : true
//             }
//         })

//         if(notes?.data.length === 0){
//             return {errorHandler : "You don't have any notes here"}
//         }

//         const message : Chatcm
//     } catch (error) {
//         return errorHandler(error)
//     }
// }
