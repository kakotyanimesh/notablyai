import { createClient } from "@/auth/server"

export default async function Dashboard () {
    const supabase = await createClient()

    const {data } = await supabase.auth.getUser()
    return (
        <div className="text-black">
            {
                JSON.stringify(data)
            }
        </div>
    )
}