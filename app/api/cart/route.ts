import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({totalAmount: 0, items: []});
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                token,
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json(userCart);
    } catch (error) {
        console.log('[CART_GET] Server error', error);
        return NextResponse.json({message: 'Не удалось получить корзину'}, {status: 500});
    }
}