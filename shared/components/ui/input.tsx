import {cn} from "@/shared/lib/utils";
import {ComponentProps, forwardRef} from "react";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "input-ui",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"