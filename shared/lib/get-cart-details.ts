import { CartDTO } from '../services/dto/cart.dto';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    colorId: number;
    salePrice?: number | null;
    disabled?: boolean;
};

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productVariant.product.name,
        imageUrl: item.productVariant.imageUrl,
        price: calcCartItemTotalPrice(item),
        salePrice: item.productVariant.salePrice || null,
        colorId: item.productVariant.colorId,
        disabled: false,
    })) as CartStateItem[];

    return {
        items,
        totalAmount: data.totalAmount,
    };
};