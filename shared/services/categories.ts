import {axiosInstance} from "@/shared/services/instance";
import {ApiRoutes} from "@/shared/services/constants";
import {CategoriesWithAllRelations} from "@/@types/prisma";

export const withProducts = async (): Promise<CategoriesWithAllRelations[]> => {
    return (await axiosInstance.get<CategoriesWithAllRelations[]>(ApiRoutes.CATEGORIES_WITH_PRODUCTS)).data;
}