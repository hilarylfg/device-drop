import {Prisma} from '@prisma/client';
import {prisma} from './prisma-client';
import {hashSync} from 'bcrypt';
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
            name: 'Aula F75',
            description: 'Игровая компактная механическая клавиатура с 75% форматом, механическими переключателями LEOBOG Reaper,\n' +
                '                RGB-подсветкой и прочным корпусом. Подключение по 2.4G Wireless, USB-C и Bluetooth. Идеальна' +
                ' для' +
                ' работы и' +
                ' игр .',
            brand: 'Aula',
            categoryId: 1,
            characteristics: {
                switchType: 'Mechanical',
                switches: 'LEOBOG Reaper',
                keyCount: 80,
                connectionType: ['USB-C', 'Bluetooth', '2.4G Wireless'],
            },
        },
    });

    const keyboard2 = await prisma.product.create({
        data: {
            name: 'Wooting 60HE',
            description: 'Игровая компактная механическая клавиатура с 60% форматом, переключателями' +
                ' Lekker с поддержкой регулировки точки срабатывания от 0.1мм, RGB-подсветкой и прочным корпусом.' +
                ' Подключение по USB-C, технология Rapid Trigger. Идеальна для киберспорта' +
                ' и динамичных игр.',
            brand: 'Wooting',
            categoryId: 1,
            characteristics: {
                switchType: 'Mechanical',
                switches: 'Lekker',
                keyCount: 60,
                connectionType: ['USB-C'],
            },
        },
    });

    const mouse = await prisma.product.create({
        data: {
            name: 'VXE MAD R Major +',
            description: 'Мышь для игр с сенсором PAW3950 и оптическим переключателем Huano Blue Shell Pink Dot. Вес' +
                ' 42 г, 6 программируемых кнопок, частота опроса 8000 Гц. Идеальна для точных и быстрых действий в' +
                ' играх.',
            brand: 'VXE',
            categoryId: 2,
            characteristics: {
                weight: '42g',
                sensorType: 'Optical',
                switchType: 'Huano Blue Shell Pink Dot',
                buttons: 6,
                connectionType: 'Wireless',
                pollingRate: '8000Hz',
                mcu: 'Nordic 52840'
            },
        },
    });

    const monitor = await prisma.product.create({
        data: {
            name: 'ZOWIE XL2546',
            description: '24.5-дюймовый монитор с частотой 240 Гц и технологией DyAc™. Матрица TN, время отклика 1 мс, разрешение 1920x1080. Регулируемая подставка, Black eQualizer для темных сцен. Идеален для киберспорта.',
            brand: 'ZOWIE',
            categoryId: 6,
            characteristics: {
                screenSize: '24.5"',
                refreshRate: '240Hz',
                resolution: '1920x1080',
                responseTime: '1ms',
            },
        },
    });

    await prisma.productVariant.createMany({
        data: [
            generateProductVariant({
                productId: keyboard.id,
                color: 'White',
                price: 4990,
                stock: 50,
                imageUrl: 'aula_f75_1.jpg',
            }),
            generateProductVariant({
                productId: keyboard.id,
                color: 'Beige',
                price: 4990,
                stock: 50,
                imageUrl: 'aula_f75_2.jpg',
            }),
            generateProductVariant({
                productId: keyboard.id,
                color: 'Black',
                price: 4990,
                stock: 50,
                imageUrl: 'aula_f75_3.jpg',
            }),
            generateProductVariant({
                productId: keyboard2.id,
                color: 'Black',
                price: 28990,
                stock: 50,
                imageUrl: 'wooting_60he_1.webp',
            }),
            generateProductVariant({
                productId: mouse.id,
                color: 'White',
                price: 6290,
                stock: 30,
                imageUrl: 'vxe_major+_1.webp',
            }),
            generateProductVariant({
                productId: mouse.id,
                color: 'Black',
                price: 6290,
                stock: 30,
                imageUrl: 'vxe_major+_2.webp',
            }),
            generateProductVariant({
                productId: monitor.id,
                color: 'Black',
                price: 30000,
                stock: 20,
                imageUrl: 'zowie_xl2546_1.webp',
            }),
            generateProductVariant({
                productId: monitor.id,
                color: 'white',
                price: 32000,
                stock: 30,
                imageUrl: 'zowie_xl2546_2.webp',
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