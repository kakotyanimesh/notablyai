
import { getNotes } from "@/app/actions/user";
import { InputBox } from "@/app/components/ui/inputbox"
import NewNotesButton from "@/app/components/ui/newNotesbutton"




export default async function Dashboard(){
    const notes = await getNotes()
    // console.log(notes, "asdasd");
    
    return (
        <div>
            <div className="flex justify-center items-center text-center">
                {/* <SearchBar/> */}
                <InputBox variant={"default"} className="md:w-[500px] w-[300px] md:h-14 h-10" label="" placeholder="search..." />
            </div>
            <div className="absolute bottom-20 right-10">
                <NewNotesButton/>
            </div>
        </div>
    )
}