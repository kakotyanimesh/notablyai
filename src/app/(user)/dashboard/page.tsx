
import { getNotes } from "@/app/actions/user";
import { BallOne } from "@/app/components/ui/balls";
import { InputBox } from "@/app/components/ui/inputbox"
import NewNotesButton from "@/app/components/ui/newNotesbutton"
import { NoteCard } from "@/app/components/ui/notecard";
import Link from "next/link";
import { toast } from "sonner";




export default async function Dashboard(){
    const notes = await getNotes()
    // console.log(notes[0].data);
    // console.log(notes);
    

    const colors = ["green", "orange", "pink", "yellow"] as const 



    if("errorInfo" in notes){
        toast.error(notes.errorInfo, {
            duration : 3000
        })
        return <div>something went wrong </div>
    }
    
    return (
        <div className="space-y-10 relative">
            <div className="absolute right-20 -top-20">
                <BallOne/>
            </div>
            <div className="flex justify-center items-center text-center ">
                {/* <SearchBar/> */}
                <InputBox variant={"default"} className="md:w-[500px] w-[300px] md:h-14 h-10" label="" placeholder="search..." />
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-6 mx-32">
                {
                    notes.map((n, key) => {
                        return <Link href={`/preview/${n.id}`} key={key}>
                        <NoteCard 
                                title={n.notesTile} 
                                data={n.data} 
                                lastUpdate={n.createdAt} 
                                colors={colors[key % colors.length]} 
                                />
                            </Link>
                    })
                }
            </div>
            <div className="fixed bottom-10  right-30">
                <NewNotesButton/>
            </div>
        </div>
    )
}