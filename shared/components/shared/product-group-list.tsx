"use client";

import {ProductCard, Skeleton} from "@/shared/components";
import {useEffect, useRef} from "react";
import {ProductWithRelations} from "@/@types/prisma";
import {useIntersection} from "react-use";
import {useCategoryStore} from "@/shared/stores/category";
import {ProductCardSkeleton} from "@/shared/components/shared/product-card";

interface ProductGroupListProps {
    title?: string
    products: ProductWithRelations[]
    categoryLink: string
    categoryId: number;
}

export function ProductGroupList({title, products, categoryLink, categoryId}: ProductGroupListProps) {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId - 1);
        }
    }, [categoryId, intersection?.isIntersecting, title]);

    return (
        <div id={title} ref={intersectionRef}>
            <h1 className="product-list__title" id={categoryLink}>{title}</h1>
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.variants?.[0]?.imageUrl}
                        price={product.variants?.[0]?.price}
                        description={product.description}
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
                {skeletonItems.map((index) => {
                    return (
                        <ProductCardSkeleton key={index}/>
                    );
                })}
            </div>
        </div>
    )
}
