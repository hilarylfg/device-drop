"use client";

import {useCart} from "@/shared/hooks/use-cart";
import {ArrowLeft, ArrowRight, PackageOpen} from "lucide-react";
import Link from "next/link";
import {useRouter} from 'next/navigation';
import {Button, CartDrawerItem, Container, getDeclension, TruckLoader} from "@/shared/components";
import {useState} from "react";

export function CartDrawer() {
    const {totalAmount, updateItemQuantity, items, removeCartItem, loading, loadingCart} = useCart();
    const [redirecting, setRedirecting] = useState(false);
    const isButtonLoading = redirecting || loading;

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };
    const router = useRouter();

    return (
        <>
            {loadingCart && (
                <div className="cart-drawer__loader">
                    <TruckLoader title="Везем вашу корзину..."/>
                </div>
            )}

            {!loadingCart && totalAmount > 0 && (
                <Container>
                    <h1 className="cart-drawer__length-title">
                        В корзине <b
                        className="accent__text">{items.length}</b> {getDeclension(items.length || 0, ['товар', 'товара', 'товаров'])}
                    </h1>
                </Container>
            )}

            {!loadingCart && !totalAmount && (
                <div className="cart-drawer__not-found">
                    <PackageOpen size={120}/>
                    <h1>Корзина пустая</h1>
                    <p>Добавьте хотя бы один товар, чтобы совершить заказ</p>
                    <Button onClick={() => router.back()}>
                        <ArrowLeft/>
                        Вернуться назад
                    </Button>
                </div>
            )}

            {!loadingCart && totalAmount > 0 && (
                <Container>
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
                                        isButtonLoading={isButtonLoading}
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
                            <div className="">
                            <h2 className="">
                                Итого
                            </h2>
                                <h1 className="">{totalAmount} ₽</h1>
                            </div>
                            <Link href="/checkout">
                                <Button
                                    onClick={() => setRedirecting(true)}
                                    loading={isButtonLoading}
                                    type="submit"
                                    className="">
                                    Оформить заказ
                                    <ArrowRight/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}