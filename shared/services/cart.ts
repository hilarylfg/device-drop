import { CartDTO, CreateCartItemValues } from './dto/cart.dto';
import {api} from "@/shared/services/instance";

export const getCart = async (): Promise<CartDTO> => {
  return await api.get<CartDTO>('cart');
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
  return await api.patch<CartDTO>('cart/' + itemId, { quantity });
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  return await api.delete<CartDTO>('cart/' + id );
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
  return await api.post<CartDTO>('cart', values);
};
