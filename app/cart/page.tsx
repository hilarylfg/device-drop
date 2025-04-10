import { CartDrawer } from "@/shared/components";
import { Suspense } from "react";

export default function Cart() {
    return (
        <main className="cart-page">
            <Suspense fallback={<div>Loading cart...</div>}>
                <CartDrawer />
            </Suspense>
        </main>
    );
}