import { axiosInstance } from './instance';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>('/cart', { withCredentials: true })).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, { quantity }, { withCredentials: true })).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>('/cart/' + id, { withCredentials: true })).data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>('/cart', values, { withCredentials: true })).data;
};
