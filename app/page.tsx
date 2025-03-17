import {Container, Filters, ProductList,   TitleLengthProducts, TopBar} from "@/shared/components";

export default function Home() {
    return (
        <>
            <Container>
                <TitleLengthProducts/>
            </Container>

            <TopBar/>

            <Container>
                <div className="catalog-block">
                    <Filters/>
                    <ProductList/>
                </div>
            </Container>
        </>
    );
}
