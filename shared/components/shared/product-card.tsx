"use client";

import { Heart, PackagePlus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import {Button, Skeleton} from "@/shared/components";
import Link from "next/link";

interface ProductCardProps {
    id?: number;
    price?: number;
    description: string;
    name: string;
    imageUrl?: string;
}

export function ProductCard({ price, description, name, imageUrl, id }: ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="product-card">
            <div className="product-card__image">
                <Heart
                    onClick={(e) => {
                        e.preventDefault();
                        setIsFavorite(!isFavorite);
                    }}
                    className={cn(
                        isFavorite && "product-card__image__favorite-active",
                        "product-card__image__favorite"
                    )}
                />
                <Link href={`/product/${id}`}>
                    <img src={`/products/${imageUrl}`} alt="" loading="lazy" />
                </Link>
            </div>
            <Link className="product-card__href" href={`/product/${id}`}>
                <h2 className="product-card__title">{name}</h2>
            </Link>
            <Link className="product-card__href" href={`/product/${id}`}>
                <p className="product-card__description">{description}</p>
            </Link>
            <div className="product-card__footer">
                <h3 className="product-card__footer__price">{price?.toLocaleString("ru-RU") + " ₽"}</h3>
                <Button><PackagePlus/>Добавить</Button>
            </div>
        </div>
    )
}

export function ProductCardSkeleton() {
    return (
        <div className="product-card--skeleton">
            <div className="product-card__image--skeleton">
                <Skeleton className="product-card__image--skeleton--content"/>
            </div>
            <Skeleton className="product-card__title--skeleton"/>
            <div className="product-card__description--skeleton">
                {Array(5).fill(0).map((_, index) => (
                    <Skeleton key={index} className="product-card__description--skeleton--content"/>
                ))}
            </div>
            <div className="product-card__footer">
                <Skeleton className="product-card__footer__price--skeleton"/>
                <Skeleton className="product-card__footer__button--skeleton"/>
            </div>
        </div>
    )
}