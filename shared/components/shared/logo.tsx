import {Package} from "lucide-react";
import {cn} from "@/shared/lib/utils";

interface Props {
    className?: string;
}

export function Logo({className}: Props) {
    return (
        <div className={cn("logo__block", className)}>
            <Package size={50}/>
            <h2 className="logo__title">Device<br/>Drop</h2>
        </div>
    )
}