'use client';

import { SessionProvider } from 'next-auth/react';
import {FC, PropsWithChildren} from "react";
import {Toaster} from "react-hot-toast";
import {Toaster as Sonner} from "@/shared/components";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <SessionProvider>{children}</SessionProvider>
            <Toaster toastOptions={{ style: { padding: "12px 15px" }, className: "toaster-ui", duration: 30000 }} />
            <Sonner/>
        </>
    );
};