import {ProductCard} from "@/shared/components";
import React from "react";
import {ProductWithRelations} from "@/@types/prisma";

interface ProductListProps {
    title: string
    products: ProductWithRelations[]
    categoryId: number
}

export function ProductList({title, products, categoryId}: ProductListProps) {
    return (
        <div>
            <h1 className="product-list__title" id={`category-${categoryId}`}>{title}</h1>
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
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
