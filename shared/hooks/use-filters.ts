import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import {useMemo, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import { FilteredProductsResponse, FilterParams } from '../services/categories';
import {Api} from "@/shared/services/api-client";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    availability: string;
    discount: string;
    colors: string;
    brands: string;
}

export interface Filters {
    availability: Set<string>;
    discount: Set<string>;
    colors: Set<string>;
    brands: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setAvailability: (value: string) => void;
    setDiscount: (value: string) => void;
    setColors: (value: string) => void;
    setBrands: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [availability, { toggle: toggleAvailability }] = useSet(
        new Set<string>(searchParams.get('availability')?.split(',') || [])
    );

    const [discount, { toggle: toggleDiscount }] = useSet(
        new Set<string>(searchParams.get('discount')?.split(',') || [])
    );

    const [colors, { toggle: toggleColors }] = useSet(
        new Set<string>(searchParams.get('colors')?.split(',') || [])
    );

    const [brands, { toggle: toggleBrands }] = useSet(
        new Set<string>(searchParams.get('brands')?.split(',') || [])
    );

    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return useMemo(
        () => ({
            availability,
            discount,
            colors,
            brands,
            prices,
            setPrices: updatePrice,
            setAvailability: toggleAvailability,
            setDiscount: toggleDiscount,
            setColors: toggleColors,
            setBrands: toggleBrands,
        }),
        [availability, discount, colors, brands, prices]
    );
};

export const useFilteredProducts = (params: FilterParams) => {
    return useQuery<FilteredProductsResponse>({
        queryKey: ['filteredProducts', params] as const,
        queryFn: () => Api.categories.getFilteredCategories(params),
        staleTime: 1000 * 60,
    });
};
