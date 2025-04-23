import errorHandler from "@/lib/errorhandler";
import prisma from "@/lib/prisma";
import { notesObject } from "@/lib/zod";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const parsedObject = notesObject.safeParse(await req.json)

        if(!parsedObject.success){
            throw {errorInfo : `${JSON.stringify(parsedObject.error.errors[0].message)}`}
        }

        const {userId , data } = parsedObject.data

        await prisma.notes.create({
            data : {
                data : data,
                userId : userId
            }
        })

        return {errorInfo : null}
    } catch (error) {
        // if((error as any).code === "P2002")
        return errorHandler(error)
    }
}