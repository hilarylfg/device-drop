import {Container, ProductForm} from "@/shared/components";
import {notFound} from "next/navigation";
import {Api} from "@/shared/services/api-client";

export default async function Product({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const response = await Api.products.find(Number(id));
    if (!response) return notFound();

    return (
        <>
            <Container>
                <ProductForm product={response}/>
            </Container>
        </>
    );
}
