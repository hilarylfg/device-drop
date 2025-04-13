'use client';

import React from 'react';
import {cn} from '@/shared/lib/utils';
import {X} from 'lucide-react';

import {CountButton} from "@/shared/components";
import {CartItemProps} from "@/shared/components/shared/cart-drawer-item";

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
                                                  name,
                                                  price,
                                                  imageUrl,
                                                  quantity,
                                                  details,
                                                  className,
                                                  disabled,
                                                  onClickCountButton,
                                                  onClickRemove,
                                              }) => {
    return (
        <div
            className={cn(
                'checkout-item',
                {
                    'checkout-item--disabled': disabled,
                },
                className,
            )}>
            <div className="checkout-item__left">
                <div className="cart-drawer-item__image__wrapper" style={{ backgroundColor: "transparent" }}>
                    <img className="cart-drawer-item__image" src={`/products/${imageUrl}`} alt={name}/>
                </div>
                <div>
                    <h2 className="cart-drawer-item__title">{name}</h2>
                    {details && <p className="cart-drawer-item__details">{details}</p>}
                </div>
                <hr className="cart-drawer-item__hr"/>
            </div>

            <h3 className="cart-drawer-item__price">{price.toLocaleString("ru-RU") + " ₽"}</h3>

            <div className="checkout-item__controls">
                <CountButton onClick={onClickCountButton} value={quantity}/>
                <button type="button" onClick={onClickRemove} className="checkout-item__remove-button">
                    <X className="checkout-item__remove-icon" size={20}/>
                </button>
            </div>
        </div>
    );
};