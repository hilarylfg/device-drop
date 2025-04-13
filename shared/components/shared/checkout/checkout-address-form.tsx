'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {AddressInput, ErrorText, Input, WhiteBlock} from "@/shared/components";

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    const { control } = useFormContext();

    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="checkout-address__form">
                <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <>
                            <AddressInput onChange={field.onChange} />
                            {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
                        </>
                    )}
                />

                <Input
                    name="comment"
                    className="checkout-address__textarea"
                    placeholder="Комментарий к заказу"
                />
            </div>
        </WhiteBlock>
    );
};