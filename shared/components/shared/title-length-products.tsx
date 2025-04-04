"use client";

import {useEffect, useState} from "react";
import {Api} from "@/shared/services/api-client";
import {Skeleton} from "@/shared/components";

export const getDeclension = (number: number, words: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[Math.min(number % 10, 5)]
        ];
};

export function TitleLengthProducts() {
    const [lenghtProducts, setLenghtProducts] = useState<number>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await Api.products.getLengthProduct();
                setLenghtProducts(response);
            } catch (e) {
                console.error("Error: ", e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <h1 className="title-length-products">
            Все девайсы: <b className="accent__text">{isLoading ? <Skeleton className="title-length-products--skeleton"/> : lenghtProducts}</b> {getDeclension(lenghtProducts|| 0, ['товар', 'товара', 'товаров'])}
        </h1>
    )
}