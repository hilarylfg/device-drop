"use client";

import {useEffect, useState} from "react";
import {Api} from "@/shared/services/api-client";
import {Skeleton} from "@/shared/components";

const getDeclension = (number: number, words: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[Math.min(number % 10, 5)]
        ];
};

export function TitleLengthProducts() {
    const [products, setProducts] = useState<number>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await Api.products.getLengthProduct();
                setProducts(response);
            } catch (e) {
                console.error("Error: ", e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <h1 className="title-length-products">
            Все девайсы: <b className="accent__text">{isLoading ? <Skeleton className="title-length-products--skeleton"/> : products}</b> {getDeclension(products || 0, ['товар', 'товара', 'товаров'])}
        </h1>
    )
}