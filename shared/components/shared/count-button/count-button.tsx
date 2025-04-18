import { cn } from '@/shared/lib/utils';
import React from 'react';
import {CountButtonIcons} from "@/shared/components";

export interface CountButtonProps {
    value?: number;
    size?: 'sm' | 'lg';
    onClick?: (type: 'plus' | 'minus') => void;
    loading?: boolean;
    className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({
                                                            className,
                                                            onClick,
                                                            loading,
                                                            value = 1,
                                                            size = 'sm',
                                                        }) => {
    return (
        <div className={cn('count-button__group', className)}>
            <CountButtonIcons
                onClick={() => onClick?.('minus')}
                disabled={value === 1}
                loading={loading}
                size={size}
                type="minus"
            />

            <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

            <CountButtonIcons onClick={() => onClick?.('plus')} size={size} loading={loading} type="plus" />
        </div>
    );
};