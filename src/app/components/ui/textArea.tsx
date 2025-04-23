import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

export const textAreaVariant = cva(
    "md:rounded-br-2xl rounded-br-xl focus:ring-1 border-1 border-[hsl(var(--primary))] focus:outline-none focus:ring-[hsl(var(--primary))] md:rounded-tl-2xl h-full rounded-tl-xl focus:bg-violet-200/30 bg-violet-200/30  w-full border-[hsl(var(--primary))]/40",
    {
        variants : {
            sizes : {
                default : "px-3 h-72 text-sm py-2" 
            }
        },
        defaultVariants : {
            sizes : "default"
        }
    }
)


interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textAreaVariant>{
    label : string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({label, sizes, className, ...props}, ref) => {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={label}>{label}</label>
            <textarea 
            className={cn(textAreaVariant({sizes}),className)}
            {...props}
            ref={ref}
            ></textarea>
        </div>
    )
})


TextArea.displayName = "textarea"