"use client";

import {useCart} from "@/shared/hooks/use-cart";
import {ArrowLeft, ArrowRight, PackageOpen} from "lucide-react";
import Link from "next/link";
import {
    Button,
    CartDrawerItem,
    getDeclension,
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle, SheetTrigger,
} from "@/shared/components";
import {ReactNode, useState} from "react";
import {cn} from "@/shared/lib";

export function CartDrawer({children}: { children: ReactNode }) {
    const {totalAmount, updateItemQuantity, items, removeCartItem, loading} = useCart();
    const [redirecting, setRedirecting] = useState(false);
    const isButtonLoading = redirecting || loading;

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="cart-drawer">
                <SheetHeader>
                    <SheetTitle>
                        В корзине <b
                        className="accent__text">{items.length}</b> {getDeclension(items.length || 0, ['товар', 'товара', 'товаров'])}
                    </SheetTitle>
                </SheetHeader>

                <div className={cn('cart-drawer__container', totalAmount <= 0 && 'cart-drawer__container--empty')}>
                    {!totalAmount && (
                        <div className="cart-drawer__not-found">
                            <PackageOpen size={120}/>
                            <h1>Корзина пустая</h1>
                            <p>Добавьте хотя бы один товар, чтобы совершить заказ</p>
                            <SheetClose className="cart-drawer__not-found__close">
                                <Button className="cart-drawer__not-found__button-close">
                                    <ArrowLeft/>
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {totalAmount > 0 && (
                        <>
                            <div className="cart-drawer__items">
                                {items.map((item) => (
                                    <CartDrawerItem
                                        key={item.id}
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
                                ))}
                            </div>

                            <SheetFooter className="cart-drawer__footer">
                                <div className="cart-drawer__footer-content">
                                    <div className="cart-drawer__total">
                                        <span className="cart-drawer__total-text">
                                          Итого
                                          <div className="cart-drawer__total-line"/>
                                        </span>
                                        <span className="cart-drawer__total-price">{totalAmount .toLocaleString("ru-RU") + " ₽"}</span>
                                    </div>

                                    <Link href="/checkout">
                                        <Button
                                            onClick={() => setRedirecting(true)}
                                            loading={redirecting}
                                            type="submit"
                                            className="cart-drawer__checkout-button">
                                            Оформить заказ
                                            <ArrowRight className="cart-drawer__checkout-button-icon"/>
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}