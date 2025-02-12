"use client";

import {useState} from "react";
import { ProductWithAllRelations } from "@/@types/prisma";
import { cn } from "@/shared/lib/utils";
import {Button, Progress, SimilarProducts} from "@/shared/components";
import { PackagePlus } from "lucide-react";

interface ProductFormProps {
    product: ProductWithAllRelations;
}

export function ProductForm({ product }: ProductFormProps) {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

    return (
        <div className="product-page">
            <p>
                <a className="product-page__link" href="/">
                    Главная
                </a>
                {" "}/{" "}
                <a
                    className="product-page__link"
                    href={`/?section=${product.category.link}`}
                >
                    {product.category.name}
                </a>
            </p>
            <div className="product-page__info">
                <div className="product-page__image">
                    <img
                        src={`/products/${selectedVariant.imageUrl}`}
                        alt={product.name}
                    />
                </div>
                <div className="product-page__description">
                    <h1 className="product-page__description__title">{product.name}</h1>
                    <h3 className="product-page__description__color">
                        Цвет: {selectedVariant.color}
                    </h3>
                    <div className="product-page__description__colors">
                        {product.variants.map((variant) => (
                            <div
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={cn(
                                    "color",
                                    variant.color.endsWith("White") ? "color__white" : "",
                                    selectedVariant.id === variant.id ? "selected" : ""
                                )}
                                style={{ backgroundColor: variant.color }}
                            ></div>
                        ))}
                    </div>
                    <p className="product-page__description__text">
                        {product.description}
                    </p>

                </div>
                <div className="product-page__sidebar">
                    <div className="product-page__price">
                        <h2 className="product-page__price__title">
                            {selectedVariant.price.toLocaleString("ru-RU") + " ₽"}
                        </h2>
                        <div className="product-page__price__stock-block">
                            <p
                                className={cn(
                                    "product-page__price__stock",
                                    !selectedVariant.stock && "product-page__price__stock--red"
                                )}
                            >
                                {selectedVariant.stock ? "В наличии" : "Нет в наличии"}
                            </p>
                            <Progress className="product-page__price__progress" value={selectedVariant.stock}/>
                        </div>
                        <Button className="product-page__price__button" disabled={selectedVariant.stock < 1}>
                            <PackagePlus />
                            Добавить
                        </Button>
                    </div>
                    <SimilarProducts productId={product.id} />
                </div>
            </div>
        </div>
    );
}