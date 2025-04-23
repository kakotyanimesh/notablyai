"use client"

import { useRouter } from "next/navigation"
import { Button } from "./button"
import { toast } from "sonner"
import { Plus } from "lucide-react"


export default function NewNotesButton(){
    const router = useRouter()
    return (
        <Button variant={"round"} size={"round"} onClick={() => {
            toast.message("Creating Notes", {
                duration : 1000
            })
            router.push("/creatNotes")
        }} ><Plus className=""/></Button>
    )
}