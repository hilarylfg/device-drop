import {Button, Container, Logo, Navbar, SearchInput} from "@/shared/components";
import {Heart, ShoppingCart, User} from "lucide-react";

export function Header() {
    return (
        <>
            <Navbar/>
            <Container>
                <header className="header">
                    <Logo/>
                    <SearchInput/>
                    <div className="button-block">
                        <Button className="button-block__button"> <User size={20}/> Вход</Button>
                        <Button className="button-block__button"> <Heart size={20}/> </Button>
                        <Button className="button-block__button"> <ShoppingCart size={20}/> </Button>
                    </div>
                </header>
            </Container>
        </>
    )
}
