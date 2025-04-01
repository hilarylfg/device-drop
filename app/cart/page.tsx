import {CartDrawer, Container} from "@/shared/components";

export default function Cart() {
    return (
        <Container>
            <main className="cart-page">
                <CartDrawer/>
            </main>
        </Container>
    );
}