"use client";

import {Button, CartDrawer} from "@/shared/components";
import {ShoppingCart} from "lucide-react";
import {useCart} from "@/shared/hooks";
import {cn} from "@/shared/lib";

export function CartButton() {
    const { items, loading } = useCart();

    return (
        <CartDrawer>
            <Button loading={loading} className={cn("button-block__button", items.length > 0 && "button-block__button--active")}>
                <ShoppingCart size={20}/>
                {items.length > 0 && <span>{items.length}</span>}
            </Button>
        </CartDrawer>
    );
}