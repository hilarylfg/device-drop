import {cn} from '@/shared/lib/utils';
import React from 'react';
import {Trash2Icon} from 'lucide-react';
import {CountButton} from "@/shared/components";

interface Props {
    id: number;
    imageUrl: string;
    details?: string;
    name: string;
    price: number;
    quantity: number;
    disabled?: boolean;
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
                                                    imageUrl,
                                                    name,
                                                    price,
                                                    quantity,
                                                    details,
                                                    disabled,
                                                    onClickCountButton,
                                                    onClickRemove,
                                                    className,
                                                }) => {
    return (
        <div
            className={cn(
                'cart-drawer__item', {'cart-drawer__item--disabled': disabled},
                className,
            )}>
            <img className={cn('cart-drawer__item__image', className)} src={`/products/${imageUrl}`} alt=""/>

            <div className="cart-drawer__item__info">
                <div>
                    <div className={cn('flex items-center justify-between', className)}>
                        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
                    </div>
                    {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
                    <hr className="cart-drawer__item__hr"/>
                    <div className="cart-drawer__item__info__buttons">
                        <Trash2Icon
                            onClick={onClickRemove}
                            size={20}
                            className="cart-drawer__item__info__buttons__trash"
                        />
                    </div>
                </div>

                <h2 className={cn('font-bold', className)}>{price} ₽</h2>

                <CountButton className="cart-drawer__item__info__count-buttons" onClick={onClickCountButton} value={quantity}/>
            </div>
        </div>
    );
};