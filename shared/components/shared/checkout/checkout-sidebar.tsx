import React from 'react';
import { ArrowRight, Package, Truck } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import {Button, CheckoutItemDetails, Skeleton, WhiteBlock} from "@/shared/components";

const DELIVERY_PRICE = 250;

interface Props {
    totalAmount: number;
    loading?: boolean;
    className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
    const totalPrice = totalAmount + DELIVERY_PRICE;

    return (
        <WhiteBlock className={cn('checkout-sidebar__block', className)}>
            <div className="checkout-sidebar__total">
                <span className="checkout-sidebar__total-label">Итого:</span>
                {loading ? (
                    <Skeleton className="checkout-sidebar__total-skeleton" />
                ) : (
                    <span className="checkout-sidebar__total-price">{totalPrice.toLocaleString("ru-RU") + " ₽"}</span>
                )}
            </div>

            <CheckoutItemDetails
                title={
                    <div className="checkout-sidebar__item-title">
                        <Package size={18} className="checkout-sidebar__item-icon" />
                        Стоимость корзины:
                    </div>
                }
                value={loading ? <Skeleton className="checkout-sidebar__item-value-skeleton" /> : `${totalAmount.toLocaleString("ru-RU") + " ₽"}`}
            />
            <CheckoutItemDetails
                title={
                    <div className="checkout-sidebar__item-title">
                        <Truck size={18} className="checkout-sidebar__item-icon" />
                        Доставка:
                    </div>
                }
                value={loading ? <Skeleton className="checkout-sidebar__item-value-skeleton" /> : `${DELIVERY_PRICE.toLocaleString("ru-RU") + " ₽"}`}
            />

            <Button
                loading={loading}
                type="submit"
                className="checkout-sidebar__button">
                Перейти к оплате
                <ArrowRight className="checkout-sidebar__button-icon" />
            </Button>
        </WhiteBlock>
    );
};