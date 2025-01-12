import Link from "next/link";
import {Container} from "@/shared/components";

export function Navbar() {
    return (
        <>
            <Container>
                <nav className="navbar">
                    <Link className="navbar__link" href="/work">Работа в&nbsp;<b className="accent__text">DeviceDrop</b></Link>
                    <Link className="navbar__link" href="/about">О нас</Link>
                    <Link className="navbar__link" href="/contacts">Контакты</Link>
                </nav>
            </Container>
            <hr className="navbar__hr"/>
        </>

    );
}
