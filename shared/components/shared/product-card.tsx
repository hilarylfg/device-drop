"use client";

import {ArrowRight, Heart} from "lucide-react";
import {cn} from "@/shared/lib/utils";
import {useState} from "react";
import {Button, PriceBlock, Skeleton} from "@/shared/components";
import Link from "next/link";
import {Color} from "@/@types/prisma";

interface ProductCardProps {
    id?: number;
    price: number;
    originalPrice?: number;
    description: string;
    name: string;
    imageUrl: string;
    color?: Color[];
}

export function ProductCard({price, originalPrice, description, name, imageUrl, id, color}: ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="product-card">
            <Link href={`/product/${id}`}>
                <div className="product-card__image">
                    {originalPrice && price !== undefined &&
                        <div className="product-card__image__pin-sale">
                            -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
                        </div>
                    }
                    {color && color.length > 1 &&
                        <div className="product-card__image__colors">
                            {color?.map(({id, hex}) => (
                                <div
                                    key={id}
                                    className='product-card__image__color'
                                    style={{backgroundColor: hex}}
                                />
                            ))}
                        </div>
                    }
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

                    <img src={`/products/${imageUrl}`} alt="" loading="lazy"/>
                </div>
            </Link>
            <Link className="product-card__href" href={`/product/${id}`}>
                <h2 className="product-card__title">{name}</h2>
            </Link>
            <Link className="product-card__href" href={`/product/${id}`}>
                <p className="product-card__description">{description}</p>
            </Link>
            <div className="product-card__footer">
                <PriceBlock className="product-card__footer__price" price={price} originalPrice={originalPrice}/>
                <Link className="product-card__href" href={`/product/${id}`}><Button>Подробнее <ArrowRight/> </Button></Link>
            </div>
        </div>
    )
}

export function ProductCardSkeleton({isSimilar = false}: { isSimilar?: boolean }) {
    return (
        <div className="product-card--skeleton">
            <div className="product-card__image--skeleton">
                <Skeleton className="product-card__image--skeleton--content"/>
            </div>
            <Skeleton className="product-card__title--skeleton"/>
            <div className="product-card__description--skeleton">
                {Array(isSimilar ? 6 : 5).fill(0).map((_, index) => (
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