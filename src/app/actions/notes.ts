"use server"

import { createClient } from "@/auth/server"
import { Prisma } from "@/generated/prisma"
import errorHandler from "@/lib/errorhandler"
import prisma from "@/lib/prisma"
// import { userClient } from "@/middleware"

export const uploadNotes = async({data, notesTile} : {
    data : string,
    notesTile : string
}) => {
    try {
        // we can add zod but ig now its unnecessary 
        if(!data || !notesTile){
            throw {errorInfo : "Empty data or UserId"}
        }

        const client = await createClient()

        const {data  : {user}} = await client.auth.getUser()
        await prisma.notes.create({
            data : {
                userId : user?.id as string,
                data : data,
                notesTile : notesTile
            }
        })

        return  {errorInfo : null}
    } catch (error) {
        return errorHandler(error)
    }
}


export const deleteNotes = async ({id, userId} : {
    id : number,
    userId : string
}) => {
    try {
        if(!id || !userId){
            throw {errorInfo : "Invalid NoteId & UserId"}
        }

        await prisma.notes.delete({
            where : {
                id : Number(id),
                userId : userId
            }
        })

        return {erroInfo : null}
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025"){
            return {errorInfo : "Unauthorized error !! "}
        }
        return errorHandler(error)
    }
}