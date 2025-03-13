'use client';

import {InputHTMLAttributes, useEffect, useRef, useState} from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/shared/components/ui';
import {ClearButton, ErrorText, RequiredSymbol} from '@/shared/components';
import {cn} from "@/shared/lib/utils";
import { Check } from 'lucide-react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export function FormInput({ className, name, label, required, ...props } : Props) {
    const [isValid, setIsValid] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    useEffect(() => {
        if (!isFocused) {
            setIsValid(!!value && !errorText);
        }
    }, [value, errorText, isFocused]);

    const handleClearClick = () => {
        setValue(name, '', { shouldValidate: true });
        setIsValid(false);
        inputRef.current?.focus();
    };

    const handleBlur = () => {
        setIsFocused(false);
        setIsValid(!!value && !errorText);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setIsValid(false);
    };

    return (
        <div className={className}>
            {label && (
                <p className="">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="form-input__block">
                <Input className={cn(errorText ? "form-input__input--error" : "form-input__input")} onFocus={handleFocus} {...register(name, {onBlur: handleBlur})} {...props} />
                {value && (
                    isFocused ? (
                        <ClearButton onClick={handleClearClick} />
                    ) : isValid && !errorText ? (
                        <Check className="form-input__valid" size={16}/>
                    ) : (
                        <ClearButton onClick={handleClearClick} />
                    )
                )}
            </div>

            <ErrorText text={errorText} className={cn(errorText ? 'form-input__error' : 'form-input__error--hide')}/>
        </div>
    );
}