'use client';

import Link from "next/link";
import {Button} from "@/shared/components";
import {ShoppingCart} from "lucide-react";

export function CartButton() {
    return (
        <Link href="/cart">
            <Button className="button-block__button">
                <ShoppingCart size={20}/>
                {/*{items.length > 0 && !loading && <b>{items.length}</b>}*/}
            </Button>
        </Link>
    );
}