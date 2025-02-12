"use client";

import Link from 'next/link';
import { Api } from "@/shared/services/api-client";
import { useEffect, useState } from "react";
import {ProductWithRelations} from "@/@types/prisma";
import {cn} from "@/shared/lib/utils";

interface SimilarProductsProps {
    productId: number;
}

export const SimilarProducts = ({ productId }: SimilarProductsProps) => {
    const [products, setProducts] = useState<ProductWithRelations[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await Api.products.similar(productId);
                setProducts(response as ProductWithRelations[]);
            } catch (e) {
                console.error("Error: ", e);
            }
        })();
    }, []);

    return (
        <div className="similar__block">
            <h2 className="similar__title">Похожие товары</h2>
            <div className="similar__list">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className={cn(product.categoryId === 1 ? "similar__list__item-keyboard" : "similar__list__item")}
                    >
                        <div className={cn(product.categoryId === 1 ? "similar__list__image-keyboard" : "similar__list__image")}>
                            <img src={`/products/${product.variants[0].imageUrl}`} alt="" />
                        </div>
                        <div className={cn(product.categoryId === 1 ? "similar__list__info-keyboard" : "similar__list__info")}>
                            <h3 className="">{product.name}</h3>
                            <p>{product.variants[0].price?.toLocaleString("ru-RU") + " ₽"}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};