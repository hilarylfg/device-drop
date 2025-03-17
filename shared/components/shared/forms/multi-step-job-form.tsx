"use client";

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {SubmitHandler, useForm } from 'react-hook-form';
import {Button, FormInput, Progress} from "@/shared/components";

interface FormData {
    name: string;
    email: string;
    experience: string;
    skills: string;
}

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

export function MultiStepJobForm() {
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
        clearErrors,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onBlur',
    });
    const [step, setStep] = useState<number>(1);

    const nextStep = async () => {
        const fieldsToValidate: (keyof FormData)[] = step === 1
            ? ['name', 'email']
            : ['experience', 'skills'];

        const isValid = await trigger(fieldsToValidate);

        if (isValid) {
            clearErrors(fieldsToValidate);
            setStep((prev) => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Заявка отправлена:', data);
        alert('Спасибо за заявку! Мы свяжемся с вами.');
    };
    const progress = Math.round(((step - 1) / 3) * 100);
    const isStepValid = step === 1 ? !errors.name && !errors.email : !errors.experience && !errors.skills;

    const Step1 = () => (
        <>
            <label>
                Имя:
                <input type="text" {...register('name')} />
                {errors.name && <span className="error">{errors.name.message}</span>}
            </label>
            <label>
                Email:
                <input type="email" {...register('email')} />
                {errors.email && <span className="error">{errors.email.message}</span>}
            </label>
            <Button type="button" onClick={nextStep} disabled={!isStepValid}>Далее</Button>
        </>
    );

    const Step2 = () => (
        <>
            <label>
            Опыт работы:
                <textarea {...register('experience')} placeholder="Расскажите о своём опыте" />
                {errors.experience && <span className="error">{errors.experience.message}</span>}
            </label>
            <label>
                Навыки:
                <input type="text" {...register('skills')} placeholder="Например: продажи, контент" />
                {errors.skills && <span className="error">{errors.skills.message}</span>}
            </label>
            <div className="button-group">
                <Button type="button" onClick={prevStep}>Назад</Button>
                <Button type="button" onClick={nextStep} disabled={!isStepValid}>Далее</Button>
            </div>
        </>
    );

    const Step3 = () => {
        const values = watch();
        return (
            <>
                <p>Проверьте данные:</p>
                <p><strong>Имя:</strong> {values.name}</p>
                <p><strong>Email:</strong> {values.email}</p>
                <p><strong>Опыт:</strong> {values.experience}</p>
                <p><strong>Навыки:</strong> {values.skills}</p>
                <div className="button-group">
                    <Button type="button" onClick={prevStep}>Назад</Button>
                    <Button type="submit">Отправить</Button>
                </div>
            </>
        );
    };

    return (
        <div className="multi-step-job-form">
            <h2 className="">Заявка на работу в DeviceDrop</h2>
            <div className="progress-bar">
                <Progress value={progress} />
                <span>{progress}%</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form-step">
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
            </form>
            <p>Шаг {step} из 3</p>
        </div>
    );
}