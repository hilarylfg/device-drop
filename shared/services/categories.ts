import {ApiRoutes} from "@/shared/services/constants";
import {CategoriesWithAllRelations} from "@/@types/prisma";
import {api} from "@/shared/services/instance";

export const withProducts = async (): Promise<CategoriesWithAllRelations[]> => {
    return await api.get<CategoriesWithAllRelations[]>(ApiRoutes.CATEGORIES_WITH_PRODUCTS);
}
export const getCategories = async (): Promise<CategoriesWithAllRelations[]> => {
    return await api.get<CategoriesWithAllRelations[]>(ApiRoutes.GET_CATEGORIES);
}