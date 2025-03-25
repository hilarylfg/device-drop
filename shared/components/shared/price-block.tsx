"use client";

import { cn } from "@/shared/lib/utils";

interface Props {
    className?: string;
    price?: number;
    originalPrice?: number;
}

export function PriceBlock({ price, originalPrice, className }: Props) {
    return (
        <div className={cn("price-block", className)}>
            <h3
                className="price-block__price"
                style={{ color: originalPrice ? "#ff4444" : "" }}
            >
                {price?.toLocaleString("ru-RU") + " ₽"}
            </h3>
            {originalPrice && (
                <h4 className="price-block__sale">
                    <div className="price-block__discount-wrapper">
                        {originalPrice && price !== undefined && (
                            <span className="price-block__discount">
                -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </span>
                        )}
                    </div>
                    <s>{originalPrice?.toLocaleString("ru-RU") + " ₽"}</s>
                </h4>
            )}
        </div>
    );
}