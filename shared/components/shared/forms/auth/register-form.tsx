import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui'; // Предполагается, что у вас есть UI-компоненты
import { TFormRegisterValues, formRegisterSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { FormInput } from '@/shared/components';
import { CircleCheck, CircleAlert } from 'lucide-react';
import { registerUser } from '@/app/actions';

interface Props {
    onClose?: VoidFunction;
}

export function RegisterForm({ onClose }: Props) {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            firstName: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                firstName: data.firstName,
                password: data.password,
            });

            toast.success('Регистрация успешна 📝. Подтвердите свою почту', {
                icon: <CircleCheck className="text-green-500" />,
            });
            onClose?.();
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Что-то пошло не так';
            toast.error(errorMessage, {
                icon: <CircleAlert className="text-red-500" />,
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="auth-form__header">
                    <p className="auth-form__header__subtitle">
                        Создайте аккаунт, заполнив данные ниже
                    </p>
                </div>

                <FormInput
                    className="auth-form__input-block"
                    name="email"
                    label="E-Mail"
                    type="email"
                    required
                />
                <FormInput
                    className="auth-form__input-block"
                    name="firstName"
                    label="Имя"
                    required
                />
                <FormInput
                    className="auth-form__input-block"
                    name="password"
                    label="Пароль"
                    type="password"
                    required
                />
                <FormInput
                    className="auth-form__input-block"
                    name="confirmPassword"
                    label="Подтвердите пароль"
                    type="password"
                    required
                />

                <Button
                    loading={form.formState.isSubmitting}
                    className="auth-form__submit-button"
                    type="submit"
                >
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    );
}