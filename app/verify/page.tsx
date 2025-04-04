"use client";

import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {signIn} from 'next-auth/react';
import toast from 'react-hot-toast';
import {CircleAlert} from 'lucide-react';
import {TruckLoader} from "@/shared/components";

export default function VerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        if (code) {
            verifyAndSignIn(code);
        }
    }, [code]);

    const verifyAndSignIn = async (code: string) => {
        try {
            const response = await fetch(`/api/auth/verify?code=${code}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка верификации');
            }

            const result = await response.json();

            if (result.success) {
                const signInResult = await signIn('credentials', {
                    authToken: result.authToken,
                    redirect: false,
                });

                if (signInResult?.ok) {
                    toast.success('Подтверждение прошло успешно');
                    router.push('/');
                } else {
                    throw new Error('Не подтвердить аккаунт');
                }
            }
        } catch (error) {
            console.error('Ошибка:', error);
            toast.error(error instanceof Error ? error.message : 'Что-то пошло не так, пробуйте еще раз позже', {
                duration: 2000,
                icon: <CircleAlert/>
            });
            router.push('/');
        }
    };

    return (
        <main className="verify-page">
            <TruckLoader title="Везем проверять ваш код подтверждения..."/>
        </main>
    );
}