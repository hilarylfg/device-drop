import React from 'react';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import {Skeleton, WhiteBlock} from "@/shared/components";
import {CheckoutItem} from "@/shared/components/shared/checkout/checkout-item";

interface Props {
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
    className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
                                                  items,
                                                  onClickCountButton,
                                                  removeCartItem,
                                                  loading,
                                                  className,
                                              }) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="checkout-cart__items">
                {loading
                    ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
                    : items.map((item) => (
                        <CheckoutItem
                            key={item.id}
                            id={item.id}
                            imageUrl={item.imageUrl}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            disabled={item.disabled}
                            onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                            onClickRemove={() => removeCartItem(item.id)}
                        />
                    ))}
            </div>
        </WhiteBlock>
    );
};

function CheckoutItemSkeleton() {
    return (
        <div className='checkout-item-skeleton'>
            <div className="checkout-item__left">
                <Skeleton className="checkout-item-skeleton__image" />
                <Skeleton className="checkout-item-skeleton__title" />
            </div>
            <Skeleton className="checkout-item-skeleton__price" />
            <Skeleton className="checkout-item-skeleton__controls" />
        </div>
    );
}