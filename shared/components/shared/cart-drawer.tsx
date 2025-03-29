"use client";

import {useCart} from "@/shared/hooks/use-cart";

export function CartDrawer() {
    const { items } = useCart();

    console.log(items)

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>
                    {item.name}
                    {item.quantity}
                </div>
            ))}
        </div>
    );
}