"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"

import { Fragment, useRef, useState, useTransition } from "react"
import { TextArea } from "./ui/textArea"
import { Send } from "lucide-react"
import { toast } from "sonner"
import { summaryAI } from "../actions/ai"

export default function ChatBox({id} : {id : number}) {
    const [questionInput, setquestionInput] = useState<string>("")
    const [questionsArray, setquestionsArray] = useState<string[]>([])    
    const [airesponses, setAiresponses] = useState<string[]>([])
    const [isThinking, setIsThinking] = useState(true)



    const [isPending, startTransition] =  useTransition()

    const handleSubmit = async () => {
        
        if(!questionInput.trim()){
            toast.error("empty questions filled ")
            return
        }

        setIsThinking(!isThinking)
        setquestionsArray([questionInput])
        
        setquestionInput("")

        // const res = await 
        startTransition(async() => {
            // await summaryAI()
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Chat with AI</Button>
            </DialogTrigger>
            <DialogContent className="w-full bg-white  flex h-[85vh] max-w-4xl flex-col overflow-y-auto ">
              <DialogHeader>
                <DialogTitle>Ask AI About Your Notes</DialogTitle>
                <DialogDescription>
                    Out AI can answer questions about all of your notes
                </DialogDescription>
              </DialogHeader>
              
              <div className="border-1 border-[hsl(var(--primary))] rounded-tr-2xl rounded-bl-2xl h-full">
                {questionsArray.map((q, index) => (
                    <Fragment key={index}>
                        <p>
                            {q}
                        </p>
                        {
                            airesponses[index] && (
                                <p dangerouslySetInnerHTML={{__html : airesponses[index]}}/>
                            )
                        }
                    </Fragment>
                ))}
                {isThinking && <h1 className="p-3 animate-pulse text-sm">Thinking ......</h1>}
              </div> 
              <div  className="flex gap-7 items-center">
                <TextArea value={questionInput} onChange={(e) => setquestionInput(e.target.value)}  className="w-96" label="" sizes={"chatBox"} disabled={isPending}/>
                <Button disabled={isPending} onClick={handleSubmit} className="px-3 py-2 bg-purple-200 " variant={"secondary"}><Send className="text-purple-500"/> </Button>
              </div>
            </DialogContent>
    </Dialog>

    )
}