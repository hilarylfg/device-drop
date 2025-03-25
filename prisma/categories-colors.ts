import { prisma } from './prisma-client';

export async function seedCategories() {
    await prisma.category.createMany({
        data: [
            { name: 'Клавиатуры', link: 'keyboards' },
            { name: 'Мышки', link: 'mouses' },
            { name: 'Наушники', link: 'headphones' },
            { name: 'Коврики', link: 'pads' },
            { name: 'Микрофоны', link: 'microphones' },
            { name: 'Аксессуары', link: 'accessories' },
        ],
    });
}

export async function seedColors() {
    await prisma.color.createMany({
        data: [
            { nameRu: 'Черный', hex: '#000000', nameEn: 'Black' },
            { nameRu: 'Белый', hex: '#ffffff', nameEn: 'White' },
            { nameRu: 'Серый', hex: '#808080', nameEn: 'Grey' },
            { nameRu: 'Красный', hex: '#ff0000', nameEn: 'Red' },
            { nameRu: 'Синий', hex: '#0000ff', nameEn: 'Blue' },
            { nameRu: 'Зеленый', hex: '#008000', nameEn: 'Green' },
            { nameRu: 'Желтый', hex: '#ffff00', nameEn: 'Yellow' },
            { nameRu: 'Оранжевый', hex: '#ffa500', nameEn: 'Orange' },
            { nameRu: 'Фиолетовый', hex: '#800080', nameEn: 'Purple' },
            { nameRu: 'Розовый', hex: '#ffc0cb', nameEn: 'Pink' },
            { nameRu: 'Коричневый', hex: '#a52a2a', nameEn: 'Brown' },
            { nameRu: 'Бежевый', hex: '#f5f5dc', nameEn: 'Beige' },
            { nameRu: 'Слоновая кость', hex: '#ffffe6', nameEn: 'Ivory' },
        ],
    });
}