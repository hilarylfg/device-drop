"use client";

import {Container, Filters, ProductList, TitleLengthProducts, TopBar} from "@/shared/components";
import {useSearchParams} from "next/navigation";
import {FilterParams} from "@/shared/services/categories";
import {useFilteredProducts} from "@/shared/hooks";

export function CatalogSection() {
    const searchParams = useSearchParams();

    const filterParams: FilterParams = {
        colors: searchParams.get('colors') || undefined,
        brands: searchParams.get('brands') || undefined,
        availability: searchParams.get('availability') === 'true',
        discount: searchParams.get('discount') === 'true',
        priceFrom: searchParams.get('priceFrom') ? Number(searchParams.get('priceFrom')) : undefined,
        priceTo: searchParams.get('priceTo') ? Number(searchParams.get('priceTo')) : undefined,
    };
    const {data, isLoading} = useFilteredProducts(filterParams);

    return (
        <>
            <Container>
                <TitleLengthProducts lenghtProducts={data?.totalCount} isLoading={isLoading}/>
            </Container>

            <TopBar categories={data?.categories} isLoading={isLoading}/>

            <Container>
                <div className="catalog-block">
                    <Filters/>
                    <ProductList isLoading={isLoading} categories={data?.categories || []}/>
                </div>
            </Container>
        </>
    )
}