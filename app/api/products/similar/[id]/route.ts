import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const productId = Number(id);

        const currentProduct = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                category: true,
                variants: { orderBy: { price: 'asc' }, take: 1 },
            },
        });

        if (!currentProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        if (!currentProduct.variants.length) {
            return NextResponse.json(
                { error: "Product has no variants" },
                { status: 400 }
            );
        }

        const priceRange = 2000;
        const basePrice = currentProduct.variants[0].price;

        let similarProducts = await prisma.product.findMany({
            where: {
                AND: [
                    { id: { not: productId } },
                    { categoryId: currentProduct.categoryId },
                    {
                        variants: {
                            some: {
                                price: {
                                    gte: basePrice - priceRange,
                                    lte: basePrice + priceRange,
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                variants: { orderBy: { price: 'asc' }, take: 1 },
            },
            take: 4,
        });

        const similarCount = similarProducts.length;

        if (similarCount < 4) {
            const additionalProducts = await prisma.product.findMany({
                where: {
                    id: { not: productId },
                    categoryId: currentProduct.categoryId,
                },
                include: {
                    variants: { orderBy: { price: 'asc' }, take: 1 },
                },
                take: 4 - similarCount,
            });

            const uniqueProductIds = new Set(similarProducts.map(product => product.id));

            const filteredAdditionalProducts = additionalProducts.filter(product => !uniqueProductIds.has(product.id));

            similarProducts = [...similarProducts, ...filteredAdditionalProducts];

            if (similarProducts.length < 4) {
                const additionalNeeded = 4 - similarProducts.length;
                const extraProducts = await prisma.product.findMany({
                    where: {
                        id: { notIn: similarProducts.map(product => product.id) },
                        categoryId: currentProduct.categoryId,
                    },
                    include: {
                        variants: { orderBy: { price: 'asc' }, take: 1 },
                    },
                    take: additionalNeeded,
                });

                similarProducts = [...similarProducts, ...extraProducts];
            }
        }

        return NextResponse.json(similarProducts);
    } catch (error) {
        console.error("Error fetching similar products:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
