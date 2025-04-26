"use client"
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { easeInOut, HTMLMotionProps, motion } from "motion/react";

const cardVariants = {
    initial : {y : 0},
    hover : {
        y : -4 , 
        transition : {type : "spring", stiffness : 800 }
    }
}


const pVariants = {
    initial : { rotate : 0, y : 0},
    hover : {
        rotate : 4,
        y : -3,
        transiton : {easeInOut}
    }
}

export const noteCardVariants = cva( 
    "rounded-tr-2xl rounded-bl-2xl hover:rounded-tl-2xl group hover:rounded-br-2xl p-4 w-full h-54 space-y-5 relative cursor-pointer transition-all ease-linear",
    {
        variants : {
            colors : {
                green : "bg-green-600/20 border-[2px] border-green-600/10 hover:bg-pink-700/20 ",
                pink : "bg-pink-700/20 border-[2px] border-pink-700/10 hover:bg-green-600/20",
                yellow : "bg-yellow-600/20 border-[2px] border-yellow-600/10 hover:bg-orange-700/20",
                orange : "bg-orange-700/20 border-[2px] border-orange-100/10 hover:bg-yellow-600/20"
            }
        },
        defaultVariants : {
            // sizes : "md",
            colors : "pink"
        }
    }
)


export interface NoteCardProps extends Omit<HTMLMotionProps<"div">, "ref">, VariantProps<typeof noteCardVariants>{
    title : string,
    data : string,
    lastUpdate : Date
}

export const NoteCard = React.forwardRef<HTMLDivElement, NoteCardProps>(({title, colors,className, data, lastUpdate, ...props}, ref) => {
    const firstfewtext = data.length > 100 ? data.slice(0, 100) + "..." : data
    return (
        <motion.div
        variants={cardVariants}
        whileHover="hover"
        initial = "initial"
        className={cn(noteCardVariants({ colors}), className)}
        {...props}
        ref={ref}
        >
            <h1 className="text-xl font-bold group-hover:underline underline-offset-3">{title.toUpperCase()}</h1>
            <p className="">{firstfewtext}</p>
            <motion.p variants={pVariants} className="absolute bottom-5 text-sm bg-purple-500/40 px-2 py-1 rounded-tr-2xl rounded-bl-2xl">{lastUpdate.toDateString()}</motion.p>
        </motion.div>
    )
})


NoteCard.displayName = "NoteCard"