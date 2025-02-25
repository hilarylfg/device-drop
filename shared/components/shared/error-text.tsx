import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
    text: string;
    className?: string;
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
    return <p className={cn('error-text', className)}>{text}</p>;
};