"use client"

import { logOutUser } from "@/app/actions/user"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LogoutButton(){
    const router = useRouter()
    return (
        <Button variant={"secondary"} onClick={async () => {
            const { errorInfo } = await logOutUser()

            if(errorInfo){
                toast.error(errorInfo)
            } else {
                toast.success("log out user")
                return router.push("/signin")

            }
        }}>Log out</Button>
    )
}