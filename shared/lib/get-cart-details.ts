import { CartDTO } from '../services/dto/cart.dto';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    colorId: number;
    salePrice?: number;
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
        name: item.productItem.product.name,
        imageUrl: item.productItem.imageUrl,
        price: calcCartItemTotalPrice(item),
        salePrice: item.productItem.salePrice || null,
        colorId: item.productItem.colorId,
        disabled: false,
    })) as CartStateItem[];

    return {
        items,
        totalAmount: data.totalAmount,
    };
};