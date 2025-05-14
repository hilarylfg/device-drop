import {ApiRoutes} from "@/shared/services/constants";
import {CategoriesWithAllRelations} from "@/@types/prisma";
import {api} from "@/shared/services/instance";

export interface FilterParams {
    colors?: string;
    brands?: string;
    availability?: boolean;
    discount?: boolean;
    priceFrom?: number;
    priceTo?: number;
    [key: string]: string | number | boolean | undefined | Array<string | number | boolean | undefined>;
}

export interface FilteredProductsResponse {
    categories: CategoriesWithAllRelations[];
    totalCount: number;
}

export const getFilteredCategories = async (params: FilterParams) => {
    return await api.get<FilteredProductsResponse>(ApiRoutes.FILTERED_PRODUCTS, { params });
}