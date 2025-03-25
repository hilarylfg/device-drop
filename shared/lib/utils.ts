import { clsx, type ClassValue } from "clsx"
import {ProductWithAllRelations} from "@/@types/prisma";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const findCheapestVariant = (variants: ProductWithAllRelations["variants"]) => {
  return variants.reduce((cheapest, current) => {
    const currentPrice = current.salePrice ?? current.price;
    const cheapestPrice = cheapest.salePrice ?? cheapest.price;
    return currentPrice < cheapestPrice ? current : cheapest;
  });
};