import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button} from '@/shared/components/ui';
import { TFormLoginValues, formLoginSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {signIn} from 'next-auth/react';
import {FormInput} from "@/shared/components";
import {CircleCheck, CircleAlert} from "lucide-react";

interface Props {
    onClose?: VoidFunction;
}

export function LoginForm({onClose}: Props) {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (resp?.status === 401) {
                toast.error('Неправильный логин или пароль' , {
                    icon: <CircleAlert/>,
                });
                return;
            }

            if (!resp?.ok) {
                throw Error();
            }

            toast.success('Вы успешно вошли в аккаунт', {
                icon: <CircleCheck/>,
            });

            onClose?.();
        } catch (error) {
            console.error('Error [LOGIN]', error);
            toast.error("Не удалось войти в аккаунт", {
                icon: <CircleAlert/>,
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="auth-form__header">
                    <p className="auth-form__header__subtitle">Введите свою почту, чтобы войти в свой аккаунт</p>
                </div>

                <FormInput className="auth-form__input-block" name="email" label="E-Mail" required/>
                <FormInput className="auth-formm__input-block" name="password" label="Пароль" type="password" required/>

                <Button loading={form.formState.isSubmitting} className="auth-form__submit-button" type="submit">
                    Войти
                </Button>
            </form>
        </FormProvider>
    );
}