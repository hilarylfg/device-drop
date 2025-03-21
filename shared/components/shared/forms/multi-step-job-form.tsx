"use client";

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Progress } from "@/shared/components";
import { FormInput } from "@/shared/components";

const formSchema = z.object({
    name: z.string()
        .min(2, 'Имя должно содержать минимум 2 символа')
        .min(1, 'Имя обязательно'),
    email: z.string()
        .email('Неверный формат email')
        .min(1, 'Email обязателен'),
    experience: z.string().min(1, 'Расскажите о своём опыте'),
    skills: z.string().min(1, 'Укажите ваши навыки'),
});

type TFormJobValues = z.infer<typeof formSchema>;

export function MultiStepJobForm() {
    const form = useForm<TFormJobValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            experience: '',
            skills: '',
        },
        mode: 'onBlur',
    });

    const [step, setStep] = useState<number>(1);
    const { handleSubmit, watch, trigger, formState: { isSubmitting } } = form;

    const nextStep = async () => {
        const fieldsToValidate: (keyof TFormJobValues)[] = step === 1
            ? ['name', 'email']
            : ['experience', 'skills'];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            setStep((prev) => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const onSubmit = async (data: TFormJobValues) => {
        console.log('Заявка отправлена:', data);
        alert('Спасибо за заявку! Мы свяжемся с вами.');
    };

    const progress = Math.round(((step - 1) / 3) * 100);

    const Step1 = () => (
        <div className="auth-form__input-block">
            <FormInput name="name" label="Имя" required />
            <FormInput name="email" label="Email" type="email" required />
            <Button type="button" onClick={nextStep}>Далее</Button>
        </div>
    );

    const Step2 = () => (
        <div className="auth-form__input-block">
            <FormInput
                name="experience"
                label="Опыт работы"
                required
                type="textarea"
                placeholder="Расскажите о своём опыте"
            />
            <FormInput
                name="skills"
                label="Навыки"
                required
                placeholder="Например: продажи, контент"
            />
            <div className="button-group">
                <Button type="button" onClick={prevStep}>Назад</Button>
                <Button type="button" onClick={nextStep}>Далее</Button>
            </div>
        </div>
    );

    const Step3 = () => {
        const values = watch();
        return (
            <div className="auth-form__input-block">
                <p>Проверьте данные:</p>
                <p><strong>Имя:</strong> {values.name}</p>
                <p><strong>Email:</strong> {values.email}</p>
                <p><strong>Опыт:</strong> {values.experience}</p>
                <p><strong>Навыки:</strong> {values.skills}</p>
                <div className="button-group">
                    <Button type="button" onClick={prevStep}>Назад</Button>
                    <Button loading={isSubmitting} type="submit">Отправить</Button>
                </div>
            </div>
        );
    };

    return (
        <FormProvider {...form}>
            <div className="multi-step-job-form">
                <div className="auth-form__header">
                    <h2>Заявка на работу в DeviceDrop</h2>
                </div>
                <div className="progress-bar">
                    <Progress value={progress} />
                    <span>{progress}%</span>
                </div>
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                </form>
                <p>Шаг {step} из 3</p>
            </div>
        </FormProvider>
    );
}