"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { summaryAI } from "../actions/ai";
import { useRouter } from "next/navigation";

export const AIsummary = ({ notes }: { notes: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  const [summarytext, setSummarytext] = useState<string | null | undefined>(
    null,
  );

  const getSummary = () => {
    startTransition(async () => {
      try {
        const res = await summaryAI({ noteText: notes });

        

        if (!res) {
          toast.error("Error Please try again later");
        }

        setSummarytext(res?.toString());

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("errpr");
      }
    });
  };
  return (
    <div className="w-96 space-y-5">
      <Button className="h-6 w-2 px-5 absolute top-26 left-5" onClick={() => router.back()}>🔙</Button>
      <Button className="w-full" variant={"primary"} disabled={isPending} onClick={getSummary}>
        {isPending ? <span className="animate-spin">⟳</span> : "GET STARTED"}
      </Button>
      <div className="py-5 px-7 prose max-w-none whitespace-pre-wrap h-fit overflow-y-auto bg-pink-400 rounded-2xl p-4" dangerouslySetInnerHTML={{ __html: summarytext ?? "" }} />
    </div>
  );
};
