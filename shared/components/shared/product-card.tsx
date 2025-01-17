"use client";

import {Heart, PackagePlus} from "lucide-react";
import {cn} from "@/shared/lib/utils";
import {useState} from "react";
import {Button} from "@/shared/components";

interface ProductCardProps {
    price?: number;
    description: string;
    name: string;
    imageUrl?: string;
}

export function ProductCard({price, description, name, imageUrl} : ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="product-card">
            <div className="product-card__image">
                <Heart onClick={() => setIsFavorite(!isFavorite)}
                       className={cn(isFavorite && 'product-card__image__favorite-active', 'product-card__image__favorite')}/>
                <img src={`./${imageUrl}`} alt=""/>
            </div>
            <h2 className="product-card__title">{name}</h2>
            <p>{description}</p>
            <div className="product-card__footer">
                <h3 className="product-card__footer__price">{price?.toLocaleString("ru-RU") + " ₽"}</h3>
                <Button><PackagePlus/>Добавить</Button>
            </div>
        </div>
    )
}
