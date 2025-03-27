"use client";

import {Api} from "@/shared/services/api-client";
import {useEffect, useMemo, useState} from "react";
import {ProductWithAllRelations} from "@/@types/prisma";
import {findCheapestVariant} from "@/shared/lib";
import {ProductCard} from "@/shared/components";
import {ProductCardSkeleton} from "@/shared/components/shared/product-card";

interface SimilarProductsProps {
    productId: number;
}

export const SimilarProducts = ({productId}: SimilarProductsProps) => {
    const [products, setProducts] = useState<ProductWithAllRelations[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
        (async () => {
            try {
                setIsLoading(true);
                const response = await Api.products.similar(productId);
                setProducts(response as ProductWithAllRelations[]);
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
                {isLoading ? (
                    <SimilarProductsSkeleton/>
                ) : (
                    productCardsData.map((product) => (
                        <ProductCard key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            description={product.description}
                                            imageUrl={product.imageUrl}
                                            price={product.price}
                                            originalPrice={product.originalPrice}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

function SimilarProductsSkeleton() {
    const skeletonItems = Array(4).fill(0);
    return (
        <div>
            <div className="similar__list">
                {skeletonItems.map((_, index) => {
                    return (
                        <ProductCardSkeleton key={index} isSimilar={true}/>
                    );
                })}
            </div>
        </div>
    )
}
