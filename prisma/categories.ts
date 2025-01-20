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