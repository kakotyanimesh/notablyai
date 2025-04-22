import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const inputVarients = cva(
    "md:rounded-br-2xl rounded-br-xl md:rounded-tl-2xl rounded-tl-xl  w-full border-[1px] focus:bg-violet-200/30 bg-violet-200/30  border-[hsl(var(--primary))]/40  md:px-5 px-2 focus:ring-1 focus:outline-none focus:ring-[hsl(var(--primary))]",
    {
        variants : {
            sizes : {
                sm : "h-10 text-sm ",
                lg : "h-10 md:text-lg text-sm",
                md : "h-10 text-base"
            },
            variant : {
                default : "",
                newtype : "ring-2 ring-red-400"
                // types of input will be definw later 
            }
        },
        defaultVariants : {
            sizes : "sm",
            variant : "default"
        }
    }
)


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVarients>{
    label : string
}


export const InputBox = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, label, type, variant, sizes, ...props}, ref) => {
        return (
            <div className="flex flex-col text-start">
                <label className="md:text-lg text-sm" htmlFor={label}>{label}</label>
                <input name={label.toLowerCase()} type={type} ref={ref} className={cn(inputVarients({variant, sizes}), className)} {...props} />
            </div>
        )
    }
)


InputBox.displayName = "Input"