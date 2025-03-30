import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Trash2Icon } from 'lucide-react';
import {CountButton} from "@/shared/components";

interface Props {
    id: number;
    imageUrl: string;
    details?: string;
    name: string;
    price: number;
    quantity: number;
    disabled?: boolean;
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
                                                    imageUrl,
                                                    name,
                                                    price,
                                                    quantity,
                                                    details,
                                                    disabled,
                                                    onClickCountButton,
                                                    onClickRemove,
                                                    className,
                                                }) => {
    return (
        <div
            className={cn(
                'cart-drawer__item', {'cart-drawer__item--disabled': disabled},
                className,
            )}>
            <img className={cn('cart-drawer__item__image', className)} src={imageUrl} alt=""/>;

            <div className="flex-1">
                <div>
                    <div className={cn('flex items-center justify-between', className)}>
                        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
                    </div>
                    {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
                </div>

                <hr className="my-3" />

                <div className="flex items-center justify-between">
                    <CountButton onClick={onClickCountButton} value={quantity} />

                    <div className="flex items-center gap-3">
                        <h2 className={cn('font-bold', className)}>{price} ₽</h2>;
                        <Trash2Icon
                            onClick={onClickRemove}
                            className="text-gray-400 cursor-pointer hover:text-gray-600"
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};