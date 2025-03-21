"use client";

import {AuthModal, Button, Container, Logo, Navbar, ProfileButton, SearchInput} from "@/shared/components";
import {Heart, ShoppingCart} from "lucide-react";
import Link from "next/link";
import {useRouter, useSearchParams } from "next/navigation";
import {useEffect, useState } from "react";
import toast from "react-hot-toast";

export function Header() {
    const [openAuthModal, setOpenAuthModal] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена!';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    return (
        <>
            <Navbar/>
            <Container>
                <header className="header" id="header">
                    <Logo/>
                    <SearchInput/>
                    <div className="button-block">
                        <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>

                        <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>
                        <Link href="/favorites"> <Button className="button-block__button"> <Heart size={20}/> </Button>
                        </Link>
                        <Link href="/cart"> <Button className="button-block__button"> <ShoppingCart size={20}/>
                        </Button> </Link>
                    </div>
                </header>
            </Container>
        </>
    )
}
