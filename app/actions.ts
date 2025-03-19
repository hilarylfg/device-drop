"use server";

import {prisma} from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import {sendEmail} from "@/shared/lib/send-email";
import {hashSync} from "bcrypt";

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error('Почта не подтверждена');
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

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });
        await sendEmail(
            createdUser.email,
            'DeviceDrop / 📝 Подтверждение регистрации',
            '<h2> 52525252525 </h2>'
        );
        console.log(code, ' - 999999');
    } catch (err) {
        console.log('Error [CREATE_USER]', err);
        throw err;
    }
}