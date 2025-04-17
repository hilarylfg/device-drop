import {Button, CartDrawer} from "@/shared/components";
import {ShoppingCart} from "lucide-react";
import {useCart} from "@/shared/hooks";

export function CartButton() {
    const {
        items,
        loading,
    } = useCart();

    return (
        <CartDrawer>
            <Button loading={loading} className="button-block__button">
                <ShoppingCart size={20}/>
                {items.length > 0 && !loading && <b>{items.length}</b>}
            </Button>
        </CartDrawer>
    );
}