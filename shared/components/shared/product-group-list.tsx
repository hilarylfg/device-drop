"use client";

import {ProductCard, Skeleton} from "@/shared/components";
import {useEffect, useMemo, useRef} from "react";
import {ProductWithAllRelations} from "@/@types/prisma";
import {useIntersection} from "react-use";
import {useCategoryStore} from "@/shared/stores";
import {ProductCardSkeleton} from "@/shared/components/shared/product-card";
import { findCheapestVariant } from "@/shared/lib/utils";

interface ProductGroupListProps {
    title?: string
    products: ProductWithAllRelations[]
    categoryLink: string
    categoryId: number;
}

export function ProductGroupList({title, products, categoryLink, categoryId}: ProductGroupListProps) {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    const productCardsData = useMemo(() => {
        return products.map((product) => {
            const cheapestVariant = findCheapestVariant(product.variants);
            const displayPrice = cheapestVariant.salePrice ?? cheapestVariant.price;
            const hasDiscount =
                cheapestVariant.salePrice !== null &&
                cheapestVariant.salePrice < cheapestVariant.price;

            return {
                id: product.id,
                name: product.name,
                imageUrl: cheapestVariant.imageUrl,
                price: displayPrice,
                originalPrice: hasDiscount ? cheapestVariant.price : undefined,
                description: product.description,
            };
        });
    }, [products]);

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId - 1);
        }
    }, [categoryId, intersection?.isIntersecting, title]);

    if (!products.length) {
        return (
            <div id={title} ref={intersectionRef}>
                <h1 className="product-list__title" id={categoryLink}>
                    {title}
                </h1>
                <div className="product-list">No products available</div>
            </div>
        );
    }

    return (
        <div id={title} ref={intersectionRef}>
            <h1 className="product-list__title" id={categoryLink}>{title}</h1>
            <div className="product-list">
                {productCardsData.map((cardData) => (
                    <ProductCard
                        key={cardData.id}
                        id={cardData.id}
                        name={cardData.name}
                        imageUrl={cardData.imageUrl}
                        price={cardData.price}
                        originalPrice={cardData.originalPrice}
                        description={cardData.description}
                    />
                ))}
            </div>
        </div>
    )
}

export function ProductGroupListSkeleton() {
    const skeletonItems = Array(6).fill(0);
    return (
        <div>
            <Skeleton className="product-list__title--skeleton"/>
            <div className="product-list">
                {skeletonItems.map((_, index) => {
                    return (
                        <ProductCardSkeleton key={index}/>
                    );
                })}
            </div>
        </div>
    )
}
