import { cn } from "@/shared/lib/utils"
import {HTMLAttributes} from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn("skeleton-ui", className)}
            {...props}
        />
    )
}