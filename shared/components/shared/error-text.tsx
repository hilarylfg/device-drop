import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
    text: string;
    className?: string;
}

export function ErrorText({ text, className } : Props) {
    return <p className={cn('error-text', className)}>{text}</p>;
}