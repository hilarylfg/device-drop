'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
    CheckoutSidebar,
    Container,
    CheckoutAddressForm,
    CheckoutCart,
    CheckoutPersonalForm,
} from '@/shared/components';
import { CheckoutFormValues, checkoutFormSchema } from '@/shared/constants';
import { Api } from '@/shared/services/api-client';
import {useCart} from "@/shared/hooks";
import {createOrder} from "@/shared/lib";

export default function CheckoutPage() {
    const [submitting, setSubmitting] = useState(false);
    const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
    const { data: session } = useSession();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    });

    useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();

            form.setValue('firstName', data.firstName);
            form.setValue('email', data.email);
        }

        if (session) {
            fetchUserInfo();
        }
    }, [form, session]);

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);
            await createOrder(data);
        } catch (err) {
            console.log(err);
            setSubmitting(false);
            toast.error('Не удалось создать заказ', {
                icon: '❌',
            });
        }
    };

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="checkout__container">
            <h1 className="checkout__title">Оформление заказа</h1>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="checkout__layout">
                        <div className="checkout__main">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                                className={loading ? 'checkout__component--disabled' : ''}
                            />

                            <CheckoutPersonalForm className={loading ? 'checkout__component--disabled' : ''} />

                            <CheckoutAddressForm className={loading ? 'checkout__component--disabled' : ''} />
                        </div>

                        <div className="checkout__sidebar">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}