import { Cart, CartItem, Product, ProductVariant } from '@prisma/client';

export type CartItemDTO = CartItem & {
  productItem: ProductVariant & {
    product: Product;
  };
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}
