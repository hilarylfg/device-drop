import { Prisma } from '@prisma/client';
import { prisma } from './prisma-client';

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
            characteristics: {
                switchType: 'Mechanical',
                switches: 'LEOBOG Reaper',
                keyCount: 80,
                percentFormat: '75%',
                connectionType: ['USB-C', 'Bluetooth', '2.4G Wireless'],
            },
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
            characteristics: {
                switches: 'Lekker Magnetic',
                switchType: 'Mechanical',
                keyCount: 60,
                percentFormat: '60%',
                connectionType: ['USB-C'],
            },
        },
    });
    const keyboard5 = await prisma.product.create({
        data: {
            name: 'Keychron K6',
            description: 'Компактная механическая клавиатура с 65% форматом, переключателями Gateron, RGB-подсветкой и поддержкой Bluetooth.',
            brand: 'Keychron',
            categoryId: 1,
            characteristics: {
                switchType: 'Mechanical',
                switches: 'Gateron',
                keyCount: 68,
                percentFormat: '65%',
                connectionType: ['USB-C', 'Bluetooth'],
            },
        },
    });

    const keyboard6 = await prisma.product.create({
        data: {
            name: 'MAD68 R',
            description: 'Игровая механическая клавиатура с 60% форматом, магнитными оптическими переключателями, ' +
                'Gasket Mount строением, Hot-Swap системой, RGB-подсветкой и прочным корпусом. Подключение по USB-C',
            brand: 'MAD',
            categoryId: 1,
            characteristics: {
                switchType: 'Mechanical',
                switches: 'Magnetic Optical',
                keyCount: 68,
                percentFormat: '60%',
                connectionType: ['USB-C'],
            },
        },
    });

    const keyboard3 = await prisma.product.create({
        data: {
            name: 'Razer Huntsman Mini',
            description: 'Компактная механическая клавиатура с 60% форматом, оптическими переключателями Razer и RGB-подсветкой.',
            brand: 'Razer',
            categoryId: 1,
            characteristics: {
                switchType: 'Optical',
                switches: 'Razer Optical',
                keyCount: 61,
                percentFormat: '60%',
                connectionType: ['USB-C'],
            },
        },
    });

    const keyboard4 = await prisma.product.create({
        data: {
            name: 'Logitech G Pro X',
            description: 'Игровая механическая клавиатура с заменяемыми переключателями, компактным дизайном и RGB-подсветкой.',
            brand: 'Logitech',
            categoryId: 1,
            characteristics: {
                switchType: 'Mechanical',
                switches: 'GX Blue',
                keyCount: 87,
                percentFormat: '80%',
                connectionType: ['USB-C'],
            },
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
            characteristics: {
                weight: '42g',
                switchType: 'Huano Blue Shell Pink Dot',
                sensor: 'PAW3950',
                battery: '500mAh',
                connectionType: ['USB-C', '2.4G Wireless'],
                pollingRate: '8000Hz',
                mcu: 'Nordic 52840'
            },
        },
    });
    const mouse2 = await prisma.product.create({
        data: {
            name: 'Logitech G Pro X Superlight',
            description: 'Игровая мышь с ультралегким дизайном (63 г), сенсором HERO 25K и беспроводным подключением.',
            brand: 'Logitech',
            categoryId: 2,
            characteristics: {
                weight: '63g',
                sensor: 'HERO 25K',
                connectionType: ['USB-C', '2.4G Wireless'],
                pollingRate: '1000Hz',
            },
        },
    });

    const mouse3 = await prisma.product.create({
        data: {
            name: 'Razer DeathAdder V3 Pro',
            description: 'Игровая мышь с сенсором Focus Pro 30K, беспроводным подключением и эргономичным дизайном.',
            brand: 'Razer',
            categoryId: 2,
            characteristics: {
                weight: '63g',
                sensor: 'Focus Pro 30K',
                connectionType: ['USB-C', '2.4G Wireless'],
                pollingRate: '1000Hz',
            },
        },
    });

    const mouse4 = await prisma.product.create({
        data: {
            name: 'VGN Dragonfly F1 Moba',
            description: 'Игровая мышь с ультралегким дизайном, сенсором Pixart 3395 и RGB-подсветкой.',
            brand: 'Glorious',
            categoryId: 2,
            characteristics: {
                weight: '55g',
                sensor: 'Pixart 3395',
                battery: '500mAh',
                switchType: 'Huano Blue Shell Pink Dot',
                connectionType: ['USB-C', '2.4G Wireless'],
                pollingRate: '4000Hz',
                mcu: 'Nordic 52840'
            },
        },
    });

    const mouse5 = await prisma.product.create({
        data: {
            name: 'SteelSeries Rival 3',
            description: 'Игровая мышь с сенсором TrueMove Core, RGB-подсветкой и прочным корпусом.',
            brand: 'SteelSeries',
            categoryId: 2,
            characteristics: {
                weight: '77g',
                sensor: 'TrueMove Core',
                connectionType: ['USB-C'],
                pollingRate: '1000Hz',
            },
        },
    });

    // Категория: Наушники
    const headphones1 = await prisma.product.create({
        data: {
            name: 'SteelSeries Arctis Pro',
            description: 'Игровые наушники с высококачественным звуком, микрофоном с шумоподавлением и поддержкой Hi-Res Audio.',
            brand: 'SteelSeries',
            categoryId: 3,
            characteristics: {
                driverSize: '40mm',
                frequencyRange: '10-40000Hz',
                microphone: 'Да',
                connectionType: ['USB', '3.5mm'],
                impedance: '32 Ohm',
            },
        },
    });

    const headphones2 = await prisma.product.create({
        data: {
            name: 'HyperX Cloud II Wireless',
            description: 'Беспроводные игровые наушники с виртуальным 7.1 surround sound и микрофоном с шумоподавлением.',
            brand: 'HyperX',
            categoryId: 3,
            characteristics: {
                driverSize: '53mm',
                frequencyRange: '15-25000Hz',
                microphone: 'Да',
                connectionType: ['USB', '2.4G Wireless'],
                impedance: '60 Ohm',
            },
        },
    });

    const headphones3 = await prisma.product.create({
        data: {
            name: 'Razer BlackShark V2',
            description: 'Игровые наушники с микрофоном с шумоподавлением и технологией THX 7.1 Surround Sound.',
            brand: 'Razer',
            categoryId: 3,
            characteristics: {
                driverSize: '50mm',
                frequencyRange: '12-28000Hz',
                microphone: 'Да',
                connectionType: ['USB', '3.5mm'],
                impedance: '32 Ohm',
            },
        },
    });

    const headphones4 = await prisma.product.create({
        data: {
            name: 'Sennheiser HD 599',
            description: 'Открытые наушники с высококачественным звуком и эргономичным дизайном.',
            brand: 'Sennheiser',
            categoryId: 3,
            characteristics: {
                driverSize: '50mm',
                frequencyRange: '12-38500Hz',
                microphone: 'Нет',
                connectionType: ['3.5mm'],
                impedance: '50 Ohm',
            },
        },
    });

    // Категория: Коврики
    const mousePad1 = await prisma.product.create({
        data: {
            name: 'SteelSeries QcK Heavy',
            description: 'Большой игровой коврик с толщиной 6 мм, тканевой поверхностью и резиновой основой.',
            brand: 'SteelSeries',
            categoryId: 4,
            characteristics: {
                surfaceType: 'Ткань',
                size: '450x400mm',
                thickness: '6mm',
                baseMaterial: 'Резина',
            },
        },
    });

    const mousePad2 = await prisma.product.create({
        data: {
            name: 'Razer Gigantus V2',
            description: 'Игровой коврик с оптимизированной поверхностью для точного контроля и резиновой основой.',
            brand: 'Razer',
            categoryId: 4,
            characteristics: {
                surfaceType: 'Ткань',
                size: '450x400mm',
                thickness: '3mm',
                baseMaterial: 'Резина',
            },
        },
    });

    const mousePad3 = await prisma.product.create({
        data: {
            name: 'Logitech G840',
            description: 'Большой игровой коврик с поверхностью, оптимизированной для точного контроля.',
            brand: 'Logitech',
            categoryId: 4,
            characteristics: {
                surfaceType: 'Ткань',
                size: '900x400mm',
                thickness: '2mm',
                baseMaterial: 'Резина',
            },
        },
    });

    const mousePad4 = await prisma.product.create({
        data: {
            name: 'Corsair MM350',
            description: 'Игровой коврик с прочной тканью и резиновой основой для устойчивости.',
            brand: 'Corsair',
            categoryId: 4,
            characteristics: {
                surfaceType: 'Ткань',
                size: '930x400mm',
                thickness: '4mm',
                baseMaterial: 'Резина',
            },
        },
    });

    // Категория: Микрофоны
    const microphone1 = await prisma.product.create({
        data: {
            name: 'Blue Yeti',
            description: 'USB-микрофон с тремя конденсаторными капсюлями и поддержкой нескольких режимов записи.',
            brand: 'Blue',
            categoryId: 5,
            characteristics: {
                type: 'Конденсаторный',
                connectionType: ['USB'],
                polarPattern: ['Кардиоидный', 'Стерео', 'Всенаправленный'],
            },
        },
    });

    const microphone2 = await prisma.product.create({
        data: {
            name: 'Razer Seiren X',
            description: 'Компактный USB-микрофон с суперкардиоидной диаграммой направленности.',
            brand: 'Razer',
            categoryId: 5,
            characteristics: {
                type: 'Конденсаторный',
                connectionType: ['USB'],
                polarPattern: ['Суперкардиоидный'],
            },
        },
    });

    const microphone3 = await prisma.product.create({
        data: {
            name: 'HyperX QuadCast',
            description: 'USB-микрофон с встроенным антивибрационным креплением и RGB-подсветкой.',
            brand: 'HyperX',
            categoryId: 5,
            characteristics: {
                type: 'Конденсаторный',
                connectionType: ['USB'],
                polarPattern: ['Кардиоидный', 'Стерео', 'Всенаправленный'],
            },
        },
    });

    const microphone4 = await prisma.product.create({
        data: {
            name: 'Audio-Technica AT2020',
            description: 'Конденсаторный микрофон с кардиоидной диаграммой направленности и высоким качеством звука.',
            brand: 'Audio-Technica',
            categoryId: 5,
            characteristics: {
                type: 'Конденсаторный',
                connectionType: ['XLR'],
                polarPattern: ['Кардиоидный'],
            },
        },
    });

    // Категория: Аксессуары
    const accessory1 = await prisma.product.create({
        data: {
            name: 'Razer Mouse Bungee V3',
            description: 'Держатель для мыши, предотвращающий запутывание провода.',
            brand: 'Razer',
            categoryId: 6,
            characteristics: {
                type: 'Держатель для мыши',
                material: 'Пластик, резина',
            },
        },
    });

    const accessory2 = await prisma.product.create({
        data: {
            name: 'Logitech G Powerplay',
            description: 'Зарядная станция для беспроводных мышей Logitech G.',
            brand: 'Logitech',
            categoryId: 6,
            characteristics: {
                type: 'Зарядная станция',
                compatibility: ['Logitech G703', 'Logitech G903'],
            },
        },
    });
    const accessory3 = await prisma.product.create({
        data: {
            name: 'Corsair ST100 RGB Headset Stand',
            description: 'Подставка для наушников с RGB-подсветкой и USB-хабом.',
            brand: 'Corsair',
            categoryId: 6,
            characteristics: {
                type: 'Подставка для наушников',
                features: ['RGB-подсветка', 'USB-хаб'],
            },
        },
    });

    // Создание вариантов продуктов
    await prisma.productVariant.createMany({
        data: [
            // Варианты для клавиатур
            generateProductVariant({
                productId: keyboard1.id,
                color: 'White',
                price: 4990,
                stock: 40,
                imageUrl: 'aula_f75_1.jpg',
            }),
            generateProductVariant({
                productId: keyboard1.id,
                color: 'Beige',
                price: 5490,
                stock: 10,
                imageUrl: 'aula_f75_2.jpg',
            }),
            generateProductVariant({
                productId: keyboard1.id,
                color: 'Black',
                price: 4790,
                stock: 0,
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
                productId: keyboard5.id,
                color: 'Grey',
                price: 8990,
                stock: 30,
                imageUrl: 'keychron_k6_1.jpg',
            }),
            generateProductVariant({
                productId: keyboard6.id,
                color: 'Black',
                price: 6490,
                stock: 20,
                imageUrl: 'mad68_r_1.jpg',
            }),
            generateProductVariant({
                productId: keyboard3.id,
                color: 'Black',
                price: 14990,
                stock: 15,
                imageUrl: 'razer_huntsman_mini_1.jpg',
            }),
            generateProductVariant({
                productId: keyboard4.id,
                color: 'Black',
                price: 15990,
                stock: 10,
                imageUrl: 'logitech_g_pro_x_keyboard_1.jpg',
            }),

            // Варианты для мышей
            generateProductVariant({
                productId: mouse1.id,
                color: 'White',
                price: 6290,
                stock: 30,
                imageUrl: 'vxe_major+_1.webp',
            }),
            generateProductVariant({
                productId: mouse1.id,
                color: 'Black',
                price: 6290,
                stock: 30,
                imageUrl: 'vxe_major+_2.webp',
            }),
            generateProductVariant({
                productId: mouse2.id,
                color: 'Black',
                price: 15990,
                stock: 15,
                imageUrl: 'logitech_g_pro_x_superlight_1.jpg',
            }),
            generateProductVariant({
                productId: mouse3.id,
                color: 'White',
                price: 17990,
                stock: 10,
                imageUrl: 'razer_deathadder_v3_pro_1.jpg',
            }),
            generateProductVariant({
                productId: mouse4.id,
                color: 'Black',
                price: 5490,
                stock: 20,
                imageUrl: 'vgn_f1_moba_1.jpg',
            }),
            generateProductVariant({
                productId: mouse5.id,
                color: 'Black',
                price: 4990,
                stock: 30,
                imageUrl: 'steelseries_rival_3_1.webp',
            }),

            // Варианты для наушников
            generateProductVariant({
                productId: headphones1.id,
                color: 'Black',
                price: 19990,
                stock: 20,
                imageUrl: 'steelseries_arctis_pro_1.png',
            }),
            generateProductVariant({
                productId: headphones2.id,
                color: 'Red',
                price: 14990,
                stock: 25,
                imageUrl: 'hyperx_cloud_ii_wireless_1.webp',
            }),
            generateProductVariant({
                productId: headphones3.id,
                color: 'Black',
                price: 12990,
                stock: 30,
                imageUrl: 'razer_blackshark_v2_1.webp',
            }),
            generateProductVariant({
                productId: headphones4.id,
                color: 'Ivory',
                price: 17990,
                stock: 15,
                imageUrl: 'sennheiser_hd_599_1.webp',
            }),

            // Варианты для ковриков
            generateProductVariant({
                productId: mousePad1.id,
                color: 'Black',
                price: 2990,
                stock: 50,
                imageUrl: 'steelseries_qck_heavy_1.jpg',
            }),
            generateProductVariant({
                productId: mousePad2.id,
                color: 'Black',
                price: 3490,
                stock: 40,
                imageUrl: 'razer_gigantus_v2_1.png',
            }),
            generateProductVariant({
                productId: mousePad3.id,
                color: 'Black',
                price: 4990,
                stock: 30,
                imageUrl: 'logitech_g840_1.jpg',
            }),
            generateProductVariant({
                productId: mousePad4.id,
                color: 'Black',
                price: 3990,
                stock: 35,
                imageUrl: 'corsair_mm350_1.jpg',
            }),

            // Варианты для микрофонов
            generateProductVariant({
                productId: microphone1.id,
                color: 'Black',
                price: 12990,
                stock: 20,
                imageUrl: 'blue_yeti_1.png',
            }),
            generateProductVariant({
                productId: microphone2.id,
                color: 'Black',
                price: 8990,
                stock: 25,
                imageUrl: 'razer_seiren_x_1.jpg',
            }),
            generateProductVariant({
                productId: microphone3.id,
                color: 'Black',
                price: 14990,
                stock: 15,
                imageUrl: 'hyperx_quadcast_1.jpg',
            }),
            generateProductVariant({
                productId: microphone4.id,
                color: 'Black',
                price: 9990,
                stock: 30,
                imageUrl: 'audio_technica_at2020_1.jpg',
            }),

            // Варианты для аксессуаров
            generateProductVariant({
                productId: accessory1.id,
                color: 'Black',
                price: 2990,
                stock: 50,
                imageUrl: 'razer_mouse_bungee_v3_1.png',
            }),
            generateProductVariant({
                productId: accessory2.id,
                color: 'Black',
                price: 14990,
                stock: 10,
                imageUrl: 'logitech_g_powerplay_1.jpg',
            }),
            generateProductVariant({
                productId: accessory3.id,
                color: 'Black',
                price: 6990,
                stock: 20,
                imageUrl: 'corsair_st100_rgb_headset_stand_1.avif',
            }),
        ],
    });
}