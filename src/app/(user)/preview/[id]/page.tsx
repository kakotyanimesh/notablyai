import { getNotes } from "@/app/actions/notes"
import ChatBox from "@/app/components/chatBox"

export default async function Preview({params} : {params : {id : number}}) {
    const id = await params.id
    const notes = await getNotes({id : Number(id)})
    // console.log(notes);

    if (!notes || "errorInfo" in notes){
        return <div>empaty notes no </div>
    }




     
    return (
        <div className="relative">
            <div className="flex flex-col space-y-5 md:mx-44">
                <h1 className="text-3xl font-bold">{notes.notesTile}</h1>
                <p className="w-fit text-md bg-purple-500/40 px-2 py-1 rounded-tr-2xl rounded-bl-2xl">{notes.createdAt.toDateString()}</p>
                <p>{notes.data}</p>
            </div>
            <div className="absolute top-10 -right-10">
                {/* <Button variant={"secondary"} onClick={summarizeAI} >Analyise with AI</Button> */}
                <ChatBox id={id}/>
            </div>
        </div>
    )
}