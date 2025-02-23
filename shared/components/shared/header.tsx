"use client";

import {AuthModal, Button, Container, Logo, Navbar, ProfileButton, SearchInput} from "@/shared/components";
import {Heart, ShoppingCart} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

export function Header() {
    const [openAuthModal, setOpenAuthModal] = useState(false);

    return (
        <>
            <Navbar/>
            <Container>
                <header className="header">
                    <Logo/>
                    <SearchInput/>
                    <div className="button-block">
                        <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                        <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                        <Link href="/favorites"> <Button className="button-block__button"> <Heart size={20}/> </Button> </Link>
                        <Link href="/cart"> <Button className="button-block__button"> <ShoppingCart size={20}/> </Button> </Link>
                    </div>
                </header>
            </Container>
        </>
    )
}
