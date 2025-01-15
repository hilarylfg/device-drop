"use client";

import {Heart, PackagePlus} from "lucide-react";
import {cn} from "@/shared/lib/utils";
import {useState} from "react";
import {Button} from "@/shared/components";

export function ProductCard() {
    const [isFavorite, setIsFavorite] = useState(false);
    const value = 4900;

    return (
        <div className="product-card">
            <div className="product-card__image">
                <Heart onClick={() => setIsFavorite(!isFavorite)}
                       className={cn(isFavorite && 'product-card__image__favorite-active', 'product-card__image__favorite')}/>
                <img src="/product_1_2.jpg" alt=""/>
            </div>
            <h2 className="product-card__title">Aula F75</h2>
            <p>Aula F75 — компактная механическая клавиатура с 75% форматом, механическими переключателями LEOBOG Reaper,
                RGB-подсветкой и прочным корпусом.</p>
            <div className="product-card__footer">
                <h3 className="product-card__footer__price">{value.toLocaleString("ru-RU") + " ₽"}</h3>
                <Button><PackagePlus/>Добавить</Button>
            </div>
        </div>
    )
}
