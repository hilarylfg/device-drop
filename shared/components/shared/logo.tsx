import {Container} from "lucide-react";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="logo__block">
            <Container size={50}/>
            <h2 className="logo__title">Device<br/>Drop</h2>
        </Link>
    )
}