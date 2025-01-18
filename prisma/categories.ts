import { prisma } from './prisma-client';

export async function seedCategories() {
    await prisma.category.createMany({
        data: [
            { name: 'Клавиатуры' },
            { name: 'Мыши' },
            { name: 'Наушники' },
            { name: 'Коврики' },
            { name: 'Микрофоны' },
            { name: 'Аксессуары' },
        ],
    });
}