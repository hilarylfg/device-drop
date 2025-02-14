"use client";

import {useEffect, useState} from "react";
import {Api} from "@/shared/services/api-client";
import {Skeleton} from "@/shared/components";

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
            Все девайсы: <b className="accent__text">{isLoading ? <Skeleton className="title-length-products--skeleton"/> : products}</b> товара
        </h1>
    )
}