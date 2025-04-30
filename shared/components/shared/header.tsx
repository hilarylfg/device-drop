"use client";

import {
    Button,
    CartButton,
    Container,
    Logo,
    Navbar,
    ProfileButton,
    SearchInput
} from "@/shared/components";
import { Heart } from "lucide-react";
import Link from "next/link";
import {useAuthModal} from "@/shared/hooks";

export function Header() {
    const { openAuthModal } = useAuthModal();

    return (
        <>
            <Navbar />
            <Container>
                <header className="header" id="header">
                    <Link className="logo-link" href="/">
                        <Logo />
                    </Link>
                    <SearchInput />
                    <div className="button-block">
                        <ProfileButton onClickSignIn={openAuthModal} />
                        <Link href="/favorites">
                            <Button className="button-block__button">
                                <Heart size={20} />
                            </Button>
                        </Link>
                        <CartButton />
                    </div>
                </header>
            </Container>
        </>
    );
}