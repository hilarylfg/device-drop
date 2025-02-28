import {Container, ProductForm} from "@/shared/components";
import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";

export default async function Product({ params }: { params: Promise<{ id: string }>}) {
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

    return (
        <>
            <Container>
                <ProductForm product={product}/>
            </Container>
        </>
    );
}
