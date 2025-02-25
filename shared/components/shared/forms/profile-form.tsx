"use client";

import {useSession} from "next-auth/react";
import {Container} from "@/shared/components";

export function ProfileForm() {
    const {data: session} = useSession()

    return (
        <Container>
            <h1>Профиль</h1>
            <p>{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
            <img src={session?.user?.image || ""} alt=""/>
        </Container>
    );
}
