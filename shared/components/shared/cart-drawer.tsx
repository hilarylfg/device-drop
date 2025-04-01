"use client";

import {useCart} from "@/shared/hooks/use-cart";
import {ArrowLeft, ArrowRight, PackageOpen} from "lucide-react";
import Link from "next/link";
import {useRouter} from 'next/navigation';
import {Button, CartDrawerItem} from "@/shared/components";
import {useState} from "react";

export function CartDrawer() {
    const {totalAmount, updateItemQuantity, items, removeCartItem} = useCart();
    const [redirecting, setRedirecting] = useState(false);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };
    const router = useRouter();

    return (
        <>
            {totalAmount > 0 && (
                <h1>В корзине <span className="font-bold">{items.length} товара</span></h1>
            )}

            {!totalAmount && (
                <div className="cart-drawer__not-found">
                    <PackageOpen size={120}/>
                    <h1>Корзина пустая</h1>
                    <p>
                        Добавьте хотя бы один товар, чтобы совершить заказ
                    </p>

                    <Button onClick={() => router.back()}>
                        <ArrowLeft/>
                        Вернуться назад
                    </Button>
                </div>
            )}

            {totalAmount > 0 && (
                <div className="cart-drawer">
                    <div className="cart-drawer__items">
                        {items.map((item) => (
                            <div key={item.id}>
                                <CartDrawerItem
                                    id={item.id}
                                    imageUrl={item.imageUrl}
                                    disabled={item.disabled}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                    onClickCountButton={(type) =>
                                        onClickCountButton(item.id, item.quantity, type)
                                    }
                                    onClickRemove={() => removeCartItem(item.id)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="cart-drawer__price-block">
                        <div className="flex mb-4">
                                <span className="flex flex-1 text-lg text-neutral-500">
                                  Итого
                                  <div
                                      className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                                </span>

                            <span className="font-bold text-lg">{totalAmount} ₽</span>
                            <Link href="/checkout">
                                <Button
                                    onClick={() => setRedirecting(true)}
                                    loading={redirecting}
                                    type="submit"
                                    className="w-full h-12 text-base">
                                    Оформить заказ
                                    <ArrowRight className="w-5 ml-2"/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}