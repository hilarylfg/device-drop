import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/prisma/prisma-client";
import {findOrCreateCart, updateCartTotalAmount} from "@/shared/lib";
import {CreateCartItemValues} from "@/shared/services/dto/cart.dto";

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

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productVariantId: data.productVariantId,
            },
        });

        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productVariantId: data.productVariantId,
                    quantity: 1,
                },
            });
        }

        const updatedUserCart = await updateCartTotalAmount(token);

        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set('cartToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 48 * 60 * 60 * 1000,
            path: '/',
            sameSite: 'strict',
        });
        return resp;
    } catch (error) {
        console.log('[CART_POST] Server error', error);
        return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
    }
}