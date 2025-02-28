"use client"

import { useTheme } from "next-themes"
import {toast, Toaster as Sonner} from "sonner"
import {ComponentProps} from "react";

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    setTimeout(() => {
        toast.warning("Сайт является pet-проектом hilarylfg, на нём" +
            " ничего не продается, находится в" +
            " разработке", {
            duration: 10000,
            closeButton: true
        })
    }, 200)

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="sonner-ui-group"
            {...props}
        />
    )
}

export { Toaster }
