
import { createClient } from "@/auth/server"

import Link from "next/link";
import Profile from "../components/ui/profile";
// import BackButton from "../components/ui/backbutton";




export default async function RootLayout({children} : {
    children : React.ReactNode
}) {
    const supabase = await createClient()

    // console.log(supabase);

    const { data : {user} } = await supabase.auth.getUser()
    


    return (
        <div className="min-h-screen relative">
            <div className="bg-purple-300 bg-opacity-100 flex w-full justify-between py-7 md:px-20 px-5 fixed shadow-xs shadow-purple-700/20 z-50">
                    {/* <BackButton/> */}
                    <Link href={"/"} className="text-3xl font-bold">Vibrant<span className="text-violet-800">Note</span></Link>
                    <Profile email={user?.email as string}/>
                    {/* <LogoutButton/>  */}
                </div>
            <div className="md:pt-36 pt-25 md:mx-20 mx-5">
                {children}
            </div>
        </div>
    )
}