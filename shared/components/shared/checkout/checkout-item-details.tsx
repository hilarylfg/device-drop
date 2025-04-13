import {cn} from '@/shared/lib/utils';
import {ReactNode} from "react";

interface Props {
    title?: ReactNode;
    value?: ReactNode;
    className?: string;
}

export function CheckoutItemDetails({title, value, className} : Props) {
    return (
        <div className={cn('checkout-item-details', className)}>
            <span className="checkout-item-details__title">
                {title}
            </span>
            <span className="checkout-item-details__value">{value}</span>
        </div>
    );
}