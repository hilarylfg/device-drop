"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { CircleAlert } from 'lucide-react';
import { verifyCodeLogic } from "@/shared/lib";

export function VerifyHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!searchParams) return;

        const code = searchParams.get('code');
        let toastMessage = '';

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена!';
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, { duration: 3000 });
            }, 1000);
            return;
        }

        if (code) {
            verifyAndSignIn(code);
        }
    }, [searchParams, router]);

    const verifyAndSignIn = async (code: string) => {
        try {
            const result = await verifyCodeLogic(code);
            if (result.success) {
                const signInResult = await signIn('credentials', {
                    authToken: result.authToken,
                    redirect: false,
                });
                if (signInResult?.ok) {
                    toast.success('Подтверждение прошло успешно');
                    router.push('/');
                } else {
                    throw new Error('Не удалось подтвердить аккаунт');
                }
            }
        } catch (error) {
            console.error('Ошибка:', error);
            toast.error(error instanceof Error ? error.message : 'Что-то пошло не так, пробуйте еще раз позже', {
                duration: 2000,
                icon: <CircleAlert />
            });
            router.push('/');
        }
    };

    return null;
}