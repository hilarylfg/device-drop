"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/shared/lib/utils"
import {ComponentPropsWithoutRef, ElementRef, forwardRef} from "react"

export const Progress = forwardRef<
    ElementRef<typeof ProgressPrimitive.Root>,
    ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "progress-ui",
            className
        )}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className="progress-ui-indicator"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName