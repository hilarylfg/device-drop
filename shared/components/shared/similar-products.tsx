"use client";

import Link from 'next/link';
import { Api } from "@/shared/services/api-client";
import { useEffect, useState } from "react";
import { ProductWithRelations } from "@/@types/prisma";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/components";

interface SimilarProductsProps {
    productId: number;
}

export const SimilarProducts = ({ productId }: SimilarProductsProps) => {
    const [products, setProducts] = useState<ProductWithRelations[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await Api.products.similar(productId);
                setProducts(response as ProductWithRelations[]);
            } catch (e) {
                console.error("Error: ", e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [productId]);

    return (
        <div className="similar__block">
            <h2 className="similar__title">Похожие товары</h2>
            <div className="similar__list">
                {isLoading
                    ? <SimilarProductsSkeleton />
                    : products.map((product) => (
                        <div
                            key={product.id}
                            className={cn(
                                product.categoryId === 1
                                    ? "similar__list__item-keyboard"
                                    : "similar__list__item"
                            )}
                        >
                            <Link href={`/product/${product.id}`} className={cn(
                                product.categoryId === 1
                                    ? "similar__list__image-keyboard"
                                    : "similar__list__image"
                            )}>
                                <img
                                    src={`/products/${product.variants[0].imageUrl}`}
                                    alt={product.name}
                                />
                            </Link>
                            <div className={cn(
                                product.categoryId === 1
                                    ? "similar__list__info-keyboard"
                                    : "similar__list__info"
                            )}>
                                <Link className="" href={`/product/${product.id}`}><h3 className="similar__list__info__title">{product.name}</h3></Link>
                                <p className={cn(product.categoryId === 1 ? "similar__list__info__price-keyboard" : "similar__list__info__price")}>
                                    {product.variants[0].price?.toLocaleString("ru-RU") + " ₽"}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};


export const SimilarProductsSkeleton = () => {
    const getRandomType = () => Math.random() < 0.5 ? "-keyboard" : "";
    const skeletonItems = Array(4).fill(0);

    return (
        <div className="similar__list">
            {skeletonItems.map((_, index) => {
                const type = getRandomType();
                return (
                    <div key={index} className={`similar__list__item${type}`}>
                        <Skeleton className={`similar__list__image${type}--skeleton`} />
                        <div className={`similar__list__info${type}`}>
                            <Skeleton className={`similar__list__info__title${type}--skeleton`} />
                            <Skeleton className={`similar__list__info__price${type}--skeleton`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};