import {Button, Container, Logo, Navbar, SearchInput} from "@/shared/components";
import {Heart, ShoppingCart, User} from "lucide-react";
import Link from "next/link";

export function Header() {
    return (
        <>
            <Navbar/>
            <Container>
                <header className="header">
                    <Logo/>
                    <SearchInput/>
                    <div className="button-block">
                        <Link href="/auth"><Button className="button-block__button"> <User size={20}/> Вход</Button> </Link>
                        <Link href="/favorites"> <Button className="button-block__button"> <Heart size={20}/> </Button> </Link>
                        <Link href="/cart"> <Button className="button-block__button"> <ShoppingCart size={20}/> </Button> </Link>
                    </div>
                </header>
            </Container>
        </>
    )
}
