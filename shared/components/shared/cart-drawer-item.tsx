import {cn} from '@/shared/lib/utils';
import React from 'react';
import {Trash2Icon} from 'lucide-react';
import {CountButton} from "@/shared/components";

export interface CartItemProps {
    id: number;
    imageUrl: string;
    details?: string;
    name: string;
    price: number;
    isButtonLoading?: boolean;
    quantity: number;
    disabled?: boolean;
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    className?: string;
}

export function CartDrawerItem({
                                                    imageUrl,
                                                    name,
                                                    price,
                                                    quantity,
                                                    isButtonLoading,
                                                    details,
                                                    disabled,
                                                    onClickCountButton,
                                                    onClickRemove,
                                                    className,
                                                } : CartItemProps) {
    return (
        <div className={cn(
            'cart-drawer-item', {'cart-drawer-item--disabled': disabled},
            className,
        )}>
            <div className="cart-drawer-item__image__wrapper">
                <img className="cart-drawer-item__image" src={`/products/${imageUrl}`} alt={name}/>
            </div>

            <div className="cart-drawer-item__info">
                <div>
                    <h2 className="cart-drawer-item__title">{name}</h2>
                    {details && <p className="cart-drawer-item__details">{details}</p>}
                </div>

                <hr className="cart-drawer-item__hr"/>

                <div className="cart-drawer-item__actions">
                    <CountButton onClick={onClickCountButton} value={quantity} loading={isButtonLoading}/>
                    <div className="cart-drawer-item__price-block">
                        <h3 className="cart-drawer-item__price">{price.toLocaleString("ru-RU") + " ₽"}</h3>
                        <Trash2Icon
                            onClick={onClickRemove}
                            className="cart-drawer-item__remove-icon"
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}