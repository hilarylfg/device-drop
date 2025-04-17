"use client";

import {
    AuthModal,
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
import { useState } from "react";

export function Header() {
    const [openAuthModal, setOpenAuthModal] = useState(false);

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
                        <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
                        <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
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