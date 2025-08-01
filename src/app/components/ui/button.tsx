import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";


export const buttonVariants = cva(
    "flex justify-center items-center  transition-colors ease-linear cursor-pointer  ",
    {
      variants : {
        variant : {
            primary : "transition-all ease-linear bg-violet-800 text-white rounded-2xl",
            secondary : "border border-violet-900 text-black hover:bg-slate-200 hover:text-purple-900 md:rounded-tr-2xl md:hover:rounded-tr-xl hover:rounded-tl-xl rounded-tr-xl md:rounded-bl-2xl md:hover:rounded-bl-xl hover:rounded-br-xl transition-all ease-linear rounded-bl-xl",
            loading : "",
            musicButton : "border border-slate-600 text-slate-50 bg-gradient-to-tr from-slate-700 to-zink-900 hover:text-pink-500 hover:text-pink-500 md:rounded-tr-2xl md:hover:rounded-tr-xl hover:rounded-tl-xl rounded-tr-xl md:rounded-bl-2xl md:hover:rounded-bl-xl hover:rounded-br-xl transition-all ease-linear rounded-bl-xl",
            round : "hover:bg-pink-200 bg-purple-600 hover:text-purple-900 text-white rounded-full "
        },
        size : {
            primary : "h-10 text-md md:px-7 px-3 font-medium ",
            secondary : "px-10 h-10 text-sm font-medium ",
            musicButtonSize : "h-8 px-5 py-2 text-sm font-light",
            round : "w-12 h-12"
        }
      },
      defaultVariants : {
        variant : "secondary",
        size : "secondary"
      }  
    },
)


export interface ButtonPros extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>{}

export const Button = React.forwardRef<HTMLButtonElement, ButtonPros>(({className ,variant, size, ...props}, ref) => {
    return (
        <button
            className={cn(buttonVariants({variant, size}), className)}
            {...props}
            ref={ref}
        />
    )
}) 


Button.displayName = "Button"