import { Prisma } from '@prisma/client';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';
import {categories, products} from "./constants";


const generateProductVariant = ({
                                    productId,
                                    color,
                                    price,
                                    stock,
                                    imageUrl,
                                }: {
    productId: number;
    color: string;
    price: number;
    stock: number;
    imageUrl: string;
}) => {
    return {
        productId,
        color,
        price,
        stock,
        imageUrl,
    } as Prisma.ProductVariantUncheckedCreateInput;
};

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ],
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.product.createMany({
        data: products,
    });

    const keyboard = await prisma.product.create({
        data: {
            name: 'Mechanical Keyboard',
            description: 'High-quality mechanical keyboard with RGB lighting',
            brand: 'BrandX',
            categoryId: 1, // Assuming 1 is the ID for 'Клавиатуры'
            characteristics: {
                dpi: 16000,
                sensorType: 'Optical',
                buttons: 6,
                connectionType: 'Wireless',
                gripType: 'Palm',
                backlight: true,
            },
        },
    });

    const mouse = await prisma.product.create({
        data: {
            name: 'Gaming Mouse',
            description: 'Ergonomic gaming mouse with adjustable DPI',
            brand: 'BrandY',
            categoryId: 2, // Assuming 2 is the ID for 'Мышки'
            characteristics: {
                switchType: 'Cherry MX Red',
                keyCount: 104,
                backlight: true,
                layout: 'ANSI',
                nKeyRollover: true,
            },
        },
    });

    await prisma.productVariant.createMany({
        data: [
            generateProductVariant({
                productId: keyboard.id,
                color: 'Black',
                price: 12000,
                stock: 50,
                imageUrl: 'https://example.com/keyboard-black.jpg',
            }),
            generateProductVariant({
                productId: mouse.id,
                color: 'White',
                price: 8000,
                stock: 30,
                imageUrl: 'https://example.com/mouse-white.jpg',
            }),
        ],
    });

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
            },
            {
                userId: 2,
                totalAmount: 0,
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            cartId: 1,
            productVariantId: 1,
            quantity: 1,
        },
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });