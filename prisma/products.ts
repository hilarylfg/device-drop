import { Prisma } from '@prisma/client';
import { prisma } from './prisma-client';

const generateProductVariant = ({
                                    productId,
                                    colorId,
                                    price,
                                    salePrice,
                                    stock,
                                    imageUrl,
                                }: {
    productId: number;
    colorId: number;
    price: number;
    salePrice?: number;
    stock: number;
    imageUrl: string;
}) => {
    return {
        productId,
        colorId,
        price,
        salePrice,
        stock,
        imageUrl,
    } as Prisma.ProductVariantUncheckedCreateInput;
};

export async function seedProducts() {
    // Категория: Клавиатуры
    const keyboard1 = await prisma.product.create({
        data: {
            name: 'Aula F75',
            description: 'Игровая механическая клавиатура с 75% форматом, переключателями' +
                ' LEOBOG Reaper, Gasket Mount строением, Hot-Swap системой, \n' +
                '                RGB-подсветкой и прочным корпусом. Подключение по радиоканалу, USB-C и Bluetooth.',
            brand: 'Aula',
            categoryId: 1,
        },
    });
    const keyboard2 = await prisma.product.create({
        data: {
            name: 'Wooting 60HE+',
            description: 'Игровая механическая клавиатура с 60% форматом, переключателями' +
                ' Lekker Magnetic с поддержкой регулировки точки срабатывания, технологией Rapid Trigger,' +
                ' RGB-подсветкой и прочным корпусом.' +
                ' Подключение по USB-C.',
            brand: 'Wooting',
            categoryId: 1,
        },
    });
    const keyboard5 = await prisma.product.create({
        data: {
            name: 'Keychron K6',
            description: 'Компактная механическая клавиатура с 65% форматом, переключателями Gateron, RGB-подсветкой и поддержкой Bluetooth.',
            brand: 'Keychron',
            categoryId: 1,
        },
    });

    const keyboard6 = await prisma.product.create({
        data: {
            name: 'MAD68 R',
            description: 'Игровая механическая клавиатура с 60% форматом, магнитными оптическими переключателями, ' +
                'Gasket Mount строением, Hot-Swap системой, RGB-подсветкой и прочным корпусом. Подключение по USB-C',
            brand: 'MAD',
            categoryId: 1,
        },
    });

    const keyboard3 = await prisma.product.create({
        data: {
            name: 'Razer Huntsman Mini',
            description: 'Компактная механическая клавиатура с 60% форматом, оптическими переключателями Razer и RGB-подсветкой.',
            brand: 'Razer',
            categoryId: 1,
        },
    });

    const keyboard4 = await prisma.product.create({
        data: {
            name: 'Logitech G Pro X',
            description: 'Игровая механическая клавиатура с заменяемыми переключателями, компактным дизайном и RGB-подсветкой.',
            brand: 'Logitech',
            categoryId: 1,
        },
    });

    // Категория: Мыши
    const mouse1 = await prisma.product.create({
        data: {
            name: 'VXE MAD R Major +',
            description: 'Игровая мышь с сенсором PAW3950 и оптическим переключателем Huano Blue Shell Pink Dot. Вес' +
                ' 42г, частота опроса 8000 Гц, аккумулятор 500мАч. Подключение по радиоканалу и USB-C.',
            brand: 'VXE',
            categoryId: 2,
        },
    });
    const mouse2 = await prisma.product.create({
        data: {
            name: 'Logitech G Pro X Superlight',
            description: 'Игровая мышь с ультралегким дизайном (63 г), сенсором HERO 25K и беспроводным подключением.',
            brand: 'Logitech',
            categoryId: 2,
        },
    });

    const mouse3 = await prisma.product.create({
        data: {
            name: 'Razer DeathAdder V3 Pro',
            description: 'Игровая мышь с сенсором Focus Pro 30K, беспроводным подключением и эргономичным дизайном.',
            brand: 'Razer',
            categoryId: 2,
        },
    });

    const mouse4 = await prisma.product.create({
        data: {
            name: 'VGN Dragonfly F1 Moba',
            description: 'Игровая мышь с ультралегким дизайном, сенсором Pixart 3395 и RGB-подсветкой.',
            brand: 'Glorious',
            categoryId: 2,
        },
    });

    const mouse5 = await prisma.product.create({
        data: {
            name: 'SteelSeries Rival 3',
            description: 'Игровая мышь с сенсором TrueMove Core, RGB-подсветкой и прочным корпусом.',
            brand: 'SteelSeries',
            categoryId: 2,
        },
    });

    // Категория: Наушники
    const headphones1 = await prisma.product.create({
        data: {
            name: 'SteelSeries Arctis Pro',
            description: 'Игровые наушники с высококачественным звуком, микрофоном с шумоподавлением и поддержкой Hi-Res Audio.',
            brand: 'SteelSeries',
            categoryId: 3,
        },
    });

    const headphones2 = await prisma.product.create({
        data: {
            name: 'HyperX Cloud II Wireless',
            description: 'Беспроводные игровые наушники с виртуальным 7.1 surround sound и микрофоном с шумоподавлением.',
            brand: 'HyperX',
            categoryId: 3,
        },
    });

    const headphones3 = await prisma.product.create({
        data: {
            name: 'Razer BlackShark V2',
            description: 'Игровые наушники с микрофоном с шумоподавлением и технологией THX 7.1 Surround Sound.',
            brand: 'Razer',
            categoryId: 3,
        },
    });

    const headphones4 = await prisma.product.create({
        data: {
            name: 'Sennheiser HD 599',
            description: 'Открытые наушники с высококачественным звуком и эргономичным дизайном.',
            brand: 'Sennheiser',
            categoryId: 3,
        },
    });

    // Категория: Коврики
    const mousePad1 = await prisma.product.create({
        data: {
            name: 'SteelSeries QcK Heavy',
            description: 'Большой игровой коврик с толщиной 6 мм, тканевой поверхностью и резиновой основой.',
            brand: 'SteelSeries',
            categoryId: 4,
        },
    });

    const mousePad2 = await prisma.product.create({
        data: {
            name: 'Razer Gigantus V2',
            description: 'Игровой коврик с оптимизированной поверхностью для точного контроля и резиновой основой.',
            brand: 'Razer',
            categoryId: 4,
        },
    });

    const mousePad3 = await prisma.product.create({
        data: {
            name: 'Logitech G840',
            description: 'Большой игровой коврик с поверхностью, оптимизированной для точного контроля.',
            brand: 'Logitech',
            categoryId: 4,
        },
    });

    const mousePad4 = await prisma.product.create({
        data: {
            name: 'Corsair MM350',
            description: 'Игровой коврик с прочной тканью и резиновой основой для устойчивости.',
            brand: 'Corsair',
            categoryId: 4,
        },
    });

    // Категория: Микрофоны
    const microphone1 = await prisma.product.create({
        data: {
            name: 'Blue Yeti',
            description: 'USB-микрофон с тремя конденсаторными капсюлями и поддержкой нескольких режимов записи.',
            brand: 'Blue',
            categoryId: 5,
        },
    });

    const microphone2 = await prisma.product.create({
        data: {
            name: 'Razer Seiren X',
            description: 'Компактный USB-микрофон с суперкардиоидной диаграммой направленности.',
            brand: 'Razer',
            categoryId: 5,
        },
    });

    const microphone3 = await prisma.product.create({
        data: {
            name: 'HyperX QuadCast',
            description: 'USB-микрофон с встроенным антивибрационным креплением и RGB-подсветкой.',
            brand: 'HyperX',
            categoryId: 5,
        },
    });

    const microphone4 = await prisma.product.create({
        data: {
            name: 'Audio-Technica AT2020',
            description: 'Конденсаторный микрофон с кардиоидной диаграммой направленности и высоким качеством звука.',
            brand: 'Audio-Technica',
            categoryId: 5,
        },
    });

    // Категория: Аксессуары
    const accessory1 = await prisma.product.create({
        data: {
            name: 'Razer Mouse Bungee V3',
            description: 'Держатель для мыши, предотвращающий запутывание провода.',
            brand: 'Razer',
            categoryId: 6,
        },
    });

    const accessory2 = await prisma.product.create({
        data: {
            name: 'Logitech G Powerplay',
            description: 'Зарядная станция для беспроводных мышей Logitech G.',
            brand: 'Logitech',
            categoryId: 6,
        },
    });

    await prisma.productVariant.createMany({
        data: [
            // Варианты для клавиатур
            generateProductVariant({
                productId: keyboard1.id,
                colorId: 2,
                price: 4990,
                salePrice: 4399,
                stock: 40,
                imageUrl: 'aula_f75_1.webp',
            }),
            generateProductVariant({
                productId: keyboard1.id,
                colorId: 12,
                price: 5490,
                stock: 10,
                imageUrl: 'aula_f75_2.webp',
            }),
            generateProductVariant({
                productId: keyboard1.id,
                colorId: 1,
                price: 4790,
                stock: 0,
                imageUrl: 'aula_f75_3.webp',
            }),
            generateProductVariant({
                productId: keyboard2.id,
                colorId: 1,
                price: 28990,
                stock: 50,
                imageUrl: 'wooting_60he_1.webp',
            }),
            generateProductVariant({
                productId: keyboard5.id,
                colorId: 3,
                price: 8990,
                stock: 30,
                imageUrl: 'keychron_k6_1.webp',
            }),
            generateProductVariant({
                productId: keyboard6.id,
                colorId: 1,
                price: 6490,
                stock: 20,
                imageUrl: 'mad68_r_1.webp',
            }),
            generateProductVariant({
                productId: keyboard3.id,
                colorId: 1,
                price: 14990,
                stock: 15,
                imageUrl: 'razer_huntsman_mini_1.webp',
            }),
            generateProductVariant({
                productId: keyboard4.id,
                colorId: 1,
                price: 15990,
                stock: 10,
                imageUrl: 'logitech_g_pro_x_keyboard_1.webp',
            }),

            // Варианты для мышей
            generateProductVariant({
                productId: mouse1.id,
                colorId: 2,
                price: 6290,
                stock: 30,
                imageUrl: 'vxe_major+_1.webp',
            }),
            generateProductVariant({
                productId: mouse1.id,
                colorId: 1,
                price: 6290,
                salePrice: 5999,
                stock: 30,
                imageUrl: 'vxe_major+_2.webp',
            }),
            generateProductVariant({
                productId: mouse2.id,
                colorId: 1,
                price: 15990,
                stock: 15,
                imageUrl: 'logitech_g_pro_x_superlight_1.webp',
            }),
            generateProductVariant({
                productId: mouse3.id,
                colorId: 2,
                price: 17990,
                stock: 10,
                imageUrl: 'razer_deathadder_v3_pro_1.webp',
            }),
            generateProductVariant({
                productId: mouse4.id,
                colorId: 1,
                price: 5490,
                stock: 20,
                imageUrl: 'vgn_f1_moba_1.webp',
            }),
            generateProductVariant({
                productId: mouse5.id,
                colorId: 1,
                price: 4990,
                stock: 30,
                imageUrl: 'steelseries_rival_3_1.webp',
            }),

            // Варианты для наушников
            generateProductVariant({
                productId: headphones1.id,
                colorId: 1,
                price: 19990,
                stock: 20,
                imageUrl: 'steelseries_arctis_pro_1.webp',
            }),
            generateProductVariant({
                productId: headphones2.id,
                colorId: 4,
                price: 14990,
                stock: 25,
                imageUrl: 'hyperx_cloud_ii_wireless_1.webp',
            }),
            generateProductVariant({
                productId: headphones3.id,
                colorId: 1,
                price: 12990,
                stock: 30,
                imageUrl: 'razer_blackshark_v2_1.webp',
            }),
            generateProductVariant({
                productId: headphones4.id,
                colorId: 13,
                price: 17990,
                stock: 15,
                imageUrl: 'sennheiser_hd_599_1.webp',
            }),

            // Варианты для ковриков
            generateProductVariant({
                productId: mousePad1.id,
                colorId: 1,
                price: 2990,
                stock: 50,
                imageUrl: 'steelseries_qck_heavy_1.webp',
            }),
            generateProductVariant({
                productId: mousePad2.id,
                colorId: 1,
                price: 3490,
                stock: 40,
                imageUrl: 'razer_gigantus_v2_1.webp',
            }),
            generateProductVariant({
                productId: mousePad3.id,
                colorId: 1,
                price: 4990,
                stock: 30,
                imageUrl: 'logitech_g840_1.webp',
            }),
            generateProductVariant({
                productId: mousePad4.id,
                colorId: 1,
                price: 3990,
                stock: 35,
                imageUrl: 'corsair_mm350_1.webp',
            }),

            // Варианты для микрофонов
            generateProductVariant({
                productId: microphone1.id,
                colorId: 1,
                price: 12990,
                stock: 20,
                imageUrl: 'blue_yeti_1.webp',
            }),
            generateProductVariant({
                productId: microphone2.id,
                colorId: 1,
                price: 8990,
                stock: 25,
                imageUrl: 'razer_seiren_x_1.webp',
            }),
            generateProductVariant({
                productId: microphone3.id,
                colorId: 1,
                price: 14990,
                stock: 15,
                imageUrl: 'hyperx_quadcast_1.webp',
            }),
            generateProductVariant({
                productId: microphone4.id,
                colorId: 1,
                price: 9990,
                stock: 30,
                imageUrl: 'audio_technica_at2020_1.webp',
            }),

            // Варианты для аксессуаров
            generateProductVariant({
                productId: accessory1.id,
                colorId: 1,
                price: 2990,
                stock: 50,
                imageUrl: 'razer_mouse_bungee_v3_1.webp',
            }),
            generateProductVariant({
                productId: accessory2.id,
                colorId: 1,
                price: 14990,
                stock: 10,
                imageUrl: 'logitech_g_powerplay_1.webp',
            }),
        ],
    });
}