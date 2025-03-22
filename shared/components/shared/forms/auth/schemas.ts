import { z } from 'zod';

export const passwordSchema = z.string().min(4, { message: 'Введите корректный пароль' });

export const formLoginSchema = z.object({
    email: z.string().email({ message: 'Введите корректную почту' }),
    password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
    .merge(
        z.object({
            firstName: z.string().min(2, { message: 'Введите имя и фамилию' }),
            confirmPassword: passwordSchema,
        }),
    )
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export const verifyFormSchema = z.object({
    code: z.string().min(6, {
        message: 'Код должен быть строкой из 6 символов',
    }),
})

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormVerifyValues = z.infer<typeof verifyFormSchema>;