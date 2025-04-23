import { Product } from '@prisma/client';
import { api } from './instance';
import { ApiRoutes } from './constants';
import {ProductWithAllRelations} from "@/@types/prisma";

export const find = async (id: number): Promise<ProductWithAllRelations> => {
  return await api.get<ProductWithAllRelations>(ApiRoutes.FIND_PRODUCT + id);
}

export const search = async (query: string): Promise<Product[]> => {
  return await api.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } });
};

export const similar = async (id: number): Promise<Product[]> => {
  return await api.get<Product[]>(ApiRoutes.SIMILAR_PRODUCTS + id);
};
export const getLengthProduct = async (): Promise<number> => {
  return await api.get<number>(ApiRoutes.LENGTH_PRODUCT);
};