"use client"
import { uploadNotes } from "@/app/actions/notes";
import { Button } from "@/app/components/ui/button";
import { InputBox } from "@/app/components/ui/inputbox";
import { TextArea } from "@/app/components/ui/textArea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function CreateNote(){
    const router = useRouter()
    const [isPending, startTransition] = useTransition()


    const postNotes = (formData : FormData) => {
        startTransition(async () => {
            

            const title = formData.get("title") as string
            const data = formData.get("data") as string

            
            const notes = await uploadNotes({
                data : data,
                notesTile : title
            })

            const errorMesage = notes.errorInfo

            if(errorMesage === null){
                toast.success("notes created successfully", {duration : 1000})
                router.push("/dashboard")

            } else {
                toast.error(errorMesage)
            }
            
        })
    }
    return (
        <div className="flex space-y-2 flex-col">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Create Your Notes here</h1>
                {/* <div className="flex justify-between gap-10">
                    <Button variant={"secondary"}>Preview</Button>
                    <Button variant={"primary"} >Save</Button>
                </div> */}
            </div>
            <form action={postNotes} className="w-full space-y-2 ">
                <div className="flex justify-end">
                    <Button variant="primary" disabled={isPending}>
                        {
                            isPending ? <Loader2 className="animate-spin"/> : "Create Notes "
                        }
                    </Button>
                </div>
                <div className="space-y-5">
                    <InputBox placeholder="Title" name="title" sizes={"md"} variant={"default"} type="text" label="Title" disabled={isPending}/>
                    <TextArea label="Write Your Notes" name="data" className=""  placeholder="Your Notes are here..." sizes={"default"} disabled={isPending}/>
                </div>
            </form>
        </div>
    )
}