import { prisma } from './prisma-client';
import { seedUsers } from './users';
import {seedCategories, seedColors} from './categories-colors';
import { seedProducts } from './products';

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Color" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();

        await seedColors()
        await seedUsers();
        await seedCategories();
        await seedProducts();

        await prisma.cart.createMany({
            data: [
                {
                    userId: 1,
                    totalAmount: 0,
                    token: '11111',
                },
                {
                    userId: 2,
                    totalAmount: 0,
                    token: '222222',
                },
            ],
        });

        await prisma.cartItem.create({
            data: {
                productVariantId: 1,
                cartId: 1,
                quantity: 2,
            },
        });

        console.log('Сидирование завершено успешно!');
    } catch (e) {
        console.error('Ошибка при сидировании:', e);
    } finally {
        await prisma.$disconnect();
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