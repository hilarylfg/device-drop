"use server";

import {prisma} from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import {sendEmail} from "@/shared/lib/send-email";
import {hashSync} from "bcrypt";
import {cookies} from "next/headers";
import {randomUUID} from "node:crypto";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error('Аккаунт не подтвержден, перейдите по ссылке в письме, отправленном на вашу почту');
            }
            throw new Error('Пользователь уже существует');
        }

        const createdUser = await prisma.user.create({
            data: {
                firstName: body.firstName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const sessionToken = randomUUID();
        const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
                sessionToken,
                expiresAt,
            },
        });

        (await cookies()).set('verification_token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 2 * 60 * 60 * 1000, 
            path: '/',
            sameSite: 'strict',
        });

        await sendEmail(
            createdUser.email,
            'DeviceDrop / 📝 Подтверждение регистрации',
            `Ваш код: ${code} \n` +
            `http://localhost:3000/verify?code=${code}`
        );
    } catch (err) {
        console.log('Error [CREATE_USER]', err);
        throw err;
    }
}

export async function verifyCodeLogic(code: string) {
    try {
        if (!code) {
            throw new Error('Неверный код');
        }

        const sessionToken = (await cookies()).get('verification_token')?.value;
        if (!sessionToken) {
            throw new Error('Токен верификации отсутствует');
        }

        const verificationCode = await prisma.verificationCode.findFirst({
            where: {
                code,
                sessionToken,
                expiresAt: { gte: new Date() },
            },
            include: {
                user: true,
            },
        });

        if (!verificationCode) {
            throw new Error('Неверный код');
        }

        await prisma.user.update({
            where: {
                id: verificationCode.userId,
            },
            data: {
                verified: new Date(),
            },
        });

        await prisma.verificationCode.delete({
            where: {
                id: verificationCode.id,
            },
        });

        (await cookies()).delete('verification_token');

        const user = verificationCode.user;

        const authToken = sign(
            {
                id: user.id.toString(),
                email: user.email,
                firstName: user.firstName,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: '10m' }
        );

        return {
            success: true,
            authToken,
        };
    } catch (err) {
        console.log('Error [VERIFY_CODE_LOGIC]', err);
        throw err;
    }
}