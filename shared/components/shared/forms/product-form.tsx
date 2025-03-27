"use client";

import {useState} from "react";
import {ProductWithAllRelations} from "@/@types/prisma";
import {cn, findCheapestVariant} from "@/shared/lib";
import {Button, PriceBlock, Progress, SimilarProducts} from "@/shared/components";
import {PackagePlus} from "lucide-react";

interface ProductFormProps {
    product: ProductWithAllRelations;
}

export function ProductForm({product}: ProductFormProps) {
    const cheapestVariant = findCheapestVariant(product.variants);
    const [selectedVariant, setSelectedVariant] = useState(cheapestVariant);

    const displayPrice = selectedVariant.salePrice ?? selectedVariant.price;
    const hasDiscount = selectedVariant.salePrice !== null && selectedVariant.salePrice < selectedVariant.price;
    const originalPrice = hasDiscount ? selectedVariant.price : undefined;

    return (
        <div className="product-page">
            <p className="product-page__links">
                <a className="product-page__link" href="/">
                    Главная
                </a>{" "}
                /{" "}
                <a
                    className="product-page__links__link"
                    href={`/?section=${product.category.link}`}
                >
                    {product.category.name}
                </a>{" "}
                /{" "}
                <span className="product-page__links__product">{product.name}</span>
            </p>
            <div className="product-page__info">
                <div className="product-page__image">
                    <img
                        src={`/products/${selectedVariant.imageUrl}`}
                        alt={product.name}
                        loading="lazy"
                    />
                </div>
                <div className="product-page__description">
                    <h1 className="product-page__description__title">{product.name}</h1>
                    <h3 className="product-page__description__color">
                        Цвет: {selectedVariant.color.nameRu}
                    </h3>
                    <div className="product-page__description__colors">
                        {product.variants.map((variant) => (
                            <div
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={cn(
                                    "color",
                                    (variant.color.nameEn || "Black").endsWith("White") ? "color__white" : "",
                                    selectedVariant.id === variant.id ? "selected" : ""
                                )}
                                style={{backgroundColor: variant.color.hex}}
                            ></div>
                        ))}
                    </div>
                    <p className="product-page__description__text">{product.description}</p>
                </div>
                <div className="product-page__sidebar">
                    <div className="product-page__price">
                        <PriceBlock price={displayPrice} originalPrice={originalPrice}/>
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
                            <PackagePlus/>
                            Добавить
                        </Button>
                    </div>
                </div>
            </div>
            <SimilarProducts productId={product.id}/>
        </div>
    );
}