import React from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
    title?: string;
    endAdornment?: React.ReactNode;
    className?: string;
    contentClassName?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
                                                                         title,
                                                                         endAdornment,
                                                                         className,
                                                                         contentClassName,
                                                                         children,
                                                                     }) => {
    return (
        <div className={cn('white-block', className)}>
            {title && (
                <div className="white-block__header">
                    <h2 className="white-block__title">{title}</h2>
                    {endAdornment}
                </div>
            )}

            <div className={cn('white-block__content', contentClassName)}>{children}</div>
        </div>
    );
};