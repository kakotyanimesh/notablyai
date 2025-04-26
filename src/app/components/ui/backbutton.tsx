"use client"
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    const router = useRouter()

    return (
        <Button className="px-3" variant={"secondary"} size={"secondary"} onClick={() => router.back()}><ArrowLeft/></Button>
    )
}