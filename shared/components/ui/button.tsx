import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/shared/lib/utils';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, asChild = false, disabled, loading, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                className={cn(
                    'button-ui',
                    className
                )}
                disabled={disabled || loading}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';