import { CartItemDTO } from '../services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const priceToUse = item.productItem.salePrice !== null && item.productItem.salePrice !== undefined
        ? item.productItem.salePrice
        : item.productItem.price;

    return priceToUse * item.quantity;
};