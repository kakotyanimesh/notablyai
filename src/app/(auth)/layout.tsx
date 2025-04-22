import { ReactNode } from "react";



export default function RootLayout({children} : {
    children :  ReactNode
}) {
    return (
        <div className="flex flex-col justify-center relative items-center mt-10">
            {/* <div className="absolute top-20 right-103 bg-gradient-to-br from-[hsl(var(--primary))] via-purple-400 opacity-40 to-[hsl(var(--secondary))] size-30 md:size-42  rounded-br-full rounded-tr-3xl">

            </div> */}
            <h1 className="text-4xl font-black">Vibrant<span className="text-violet-800">Note</span></h1>
            <p className="text-slate-500">Your AI-powered notes app</p>
            <div className="p-7 mt-10 md:w-96 w-80 border border-slate-700 bg-white/50 rounded-bl-3xl rounded-tr-3xl text-center">
                {children}
            </div>
        </div>
    )
}