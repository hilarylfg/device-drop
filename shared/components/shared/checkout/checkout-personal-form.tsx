import React from 'react';
import {FormInput, WhiteBlock} from "@/shared/components";

interface Props {
    className?: string;
}

export function CheckoutPersonalForm ({ className } : Props) {
    return (
        <WhiteBlock title="2. Персональные данные" className={className}>
            <div className="checkout-personal__form">
                <FormInput name="firstName" className="checkout-personal__input" placeholder="Имя" />
                <FormInput name="lastName" className="checkout-personal__input" placeholder="Фамилия" />
                <FormInput name="email" className="checkout-personal__input" placeholder="E-Mail" />
                <FormInput name="phone" className="checkout-personal__input" placeholder="Телефон" />
            </div>
        </WhiteBlock>
    );
}