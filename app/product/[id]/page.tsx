import {Container, ProductForm} from "@/shared/components";
import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";

export default async function Product({ params }: { params: { id: string } }) {
    const { id } = await params;
    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: {
            category: true,
            variants: true,
        },
    });

    if (!product) {
        return notFound();
    }

    console.log(product)

    return (
        <>
            <Container>
                <ProductForm product={product}/>
            </Container>
        </>
    );
}
