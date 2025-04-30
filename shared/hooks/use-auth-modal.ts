import { useContext } from "react";
import {AuthModalContext} from "@/shared/components";

export const useAuthModal = () => {
    const ctx = useContext(AuthModalContext);
    if (!ctx) throw new Error("useAuthModal must be used within AuthProvider");
    return ctx;
};