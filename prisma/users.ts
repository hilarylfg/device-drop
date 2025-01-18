import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

export async function seedUsers() {
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
}