import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

export const textAreaVariant = cva(
    "border-1 border-[hsl(var(--primary))] w-full focus:ring-1  focus:outline-none focus:ring-[hsl(var(--primary))]  focus:bg-violet-200/30 bg-violet-200/30  w-full border-[hsl(var(--primary))]/40",
    {
        variants : {
            sizes : {
                default : "md:rounded-br-2xl rounded-br-xl   md:rounded-tl-2xl h-full rounded-tl-xl  px-3 h-72 text-sm py-2",
                chatBox : "h-10 md:rounded-bl-2xl rounded-br-lg rounded-bl-xl rounded-tl-lg md:rounded-tr-2xl rounded-tr-xl overflow-auto resize-none scrollbar-hide px-3 py-1"
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
            {
                label && <label htmlFor={label}>{label}</label>
            }
            <textarea 
            className={cn(textAreaVariant({sizes}),className)}
            {...props}
            ref={ref}
            ></textarea>
        </div>
    )
})


TextArea.displayName = "textarea"