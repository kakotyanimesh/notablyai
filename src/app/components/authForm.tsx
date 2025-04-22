"use client"
import { useTransition } from "react"
import { InputBox } from "./ui/inputbox"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { logInUser, signupUser } from "../actions/user"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type AuthType  = {
   authTypes :  "signup" | "login"
}


export default function AuthForm({authTypes} : AuthType ) {
    const formType = authTypes === "signup"
    const router = useRouter()

    const [isPending, startTransition] = useTransition()

    const authSubmit = (formData : FormData) => {
        startTransition(async () => {
            const email = formData.get("email") as string
            const password = formData.get("password") as string
            // console.log(email, password);

            let errormessges;
            if(formType){
                const username = formData.get("username") as string

                const user  = await signupUser({email : email, password : password, username : username})
                // console.log(registeredUser);
                // console.log(user.errorInfo);
                errormessges = user.errorInfo
            } else {
                const user = await logInUser({email : email, password : password})
                // console.log(user.errorInfo);
                errormessges = user.errorInfo
            }
            
            if(errormessges ===  null){
                toast.success("auth successfull ")
                router.push("/dashboard")
            } else {
                toast.error(errormessges)
            }
            
        })
    }
    return (
        <div>
            <form action={authSubmit} className="space-y-5">
                <InputBox label="email" variant={"default"} sizes={"lg"} disabled={isPending}/>
                <InputBox label="password" variant={"default"} sizes={"lg"} disabled={isPending} />
                {
                    formType && <InputBox label="username" variant={"default"} sizes={"lg"} disabled={isPending}/>
                }
                <Button variant={"primary"} className="flex justify-self-center w-full" disabled={isPending}>
                    {
                        isPending ? <Loader2 className="animate-spin"/> : formType ?"signup" : "login"
                    }
                </Button>
                {
                   !formType && <Button variant={"primary"} className=" flex justify-self-center w-full">
                    Sign In with Google
                   </Button> 
                }
                {
                    formType ? <p className="">Already have an account ? <Link className="text-purple-900" href={"/signin"}>Signin </Link></p> : <p>Don't have an account ? <Link className="text-purple-900" href={"/signup"}>Sign up </Link></p>
                }
            </form>
        </div>
    )
}