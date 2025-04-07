"use client";

import { FormProvider, useForm } from "react-hook-form";
import { TFormVerifyValues, verifyFormSchema } from "@/shared/components/shared/forms/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components/ui";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { CircleAlert, CircleCheck } from "lucide-react";
import {signIn} from "next-auth/react";
import {verifyCodeLogic} from "@/shared/lib";

export function VerifyForm({ onClose }: { onClose: () => void }) {
    const form = useForm<TFormVerifyValues>({
        resolver: zodResolver(verifyFormSchema),
        defaultValues: {
            code: '',
        },
        mode: 'onBlur',
    });

    const { handleSubmit, setValue, watch } = form;
    const codeValue = watch('code');
    const [isLoading, setIsLoading] = React.useState(false);
    const [verificationStatus, setVerificationStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

    const onSubmit = async (data: TFormVerifyValues) => {
        setIsLoading(true);
        setVerificationStatus('idle');
        try {
            const result = await verifyCodeLogic(data.code)

            await signIn('credentials', {
                authToken: result.authToken,
                redirect: false,
            });

            setVerificationStatus('success');
            toast("Подтверждение прошло успешно", {
                icon: <CircleCheck />,
            });

            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) errorMessage = error.message;

            setVerificationStatus('error');
            console.error('Ошибка верификации:', error);
            toast(errorMessage, {
                icon: <CircleAlert />,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (codeValue?.length === 6) {
            handleSubmit(onSubmit)();
        }
    }, [codeValue, handleSubmit]);

    const handleOTPChange = (value: string) => {
        setValue('code', value, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setVerificationStatus('idle');
    };

    const getSlotClass = () => {
        if (isLoading) return 'loading';
        if (verificationStatus === 'success') return 'success';
        if (verificationStatus === 'error') return 'error';
        return '';
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-form__header">
                    <p className="auth-form__header__subtitle">
                        Введите код подтверждения, отправленный на почту
                    </p>
                </div>
                <InputOTP className="auth-form__input-code"
                    maxLength={6}
                    value={codeValue}
                    onChange={handleOTPChange}
                    disabled={isLoading}
                >
                    <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPSlot
                                key={index}
                                index={index}
                                className={getSlotClass()}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </form>
        </FormProvider>
    );
}