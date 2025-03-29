import { CartItemDTO } from '../services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const priceToUse = item.productVariant.salePrice !== null && item.productVariant.salePrice !== undefined
        ? item.productVariant.salePrice
        : item.productVariant.price;

    return priceToUse * item.quantity;
};