import { Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const search = async (query: string): Promise<Product[]> => {
  return (await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } }))
    .data;
};

export const similar = async (id: number): Promise<Product[]> => {
  return (await axiosInstance.get<Product[]>(ApiRoutes.SIMILAR_PRODUCTS + id)).data;
};
export const getLengthProduct = async (): Promise<number> => {
  return (await axiosInstance.get<number>(ApiRoutes.LENGTH_PRODUCT)).data;
};