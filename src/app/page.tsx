"use client";
import { Button } from "./components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-5">
      <h1 className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-7xl font-bold text-transparent">
        NOTABLYAI
      </h1>
      <Button variant={"primary"}>
        <Link href={"/signin"}>GET STARTED</Link>
      </Button>
    </div>
  );
}
