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
    isButtonLoading?: boolean;
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
                                                    isButtonLoading,
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
            <div className='cart-drawer__item__image__wrapper'>
                <img className={cn('cart-drawer__item__image', className)} src={`/products/${imageUrl}`} alt=""/>
            </div>

            <div className="cart-drawer__item__info">
                <div className="cart-drawer__item__block">
                    <div className="cart-drawer__item__block__content">
                        <div style={{width: 'fit-content'}}>
                            <h2 className="cart-drawer__item__info__title">{name}</h2>
                            {details && <p className="">{details}</p>}
                            <hr className="cart-drawer__item__hr"/>
                            <div className="cart-drawer__item__info__buttons">
                                <Trash2Icon
                                    onClick={onClickRemove}
                                    size={20}
                                    className="cart-drawer__item__info__buttons__trash"
                                />
                            </div>
                        </div>
                    </div>
                    <h2 className={cn('', className)}>{price} ₽</h2>
                </div>

                <CountButton className="cart-drawer__item__info__count-buttons" onClick={onClickCountButton}
                             value={quantity} loading={isButtonLoading}/>
            </div>
        </div>
    );
};