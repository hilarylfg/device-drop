import {prisma} from "@/prisma/prisma-client";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest,{ params }:  { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const productId = Number(id);

    try {
        const product = await prisma.product.findFirst({
            where: { id: productId },
            include: {
                variants: {
                    include: {
                        color: true,
                    },
                },
                category: true,
            },
        });

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}