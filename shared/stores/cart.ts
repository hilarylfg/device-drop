import { create } from 'zustand';
import { Api } from '../services/api-client';
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { CartStateItem, getCartDetails } from '@/shared/lib';

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    addCartItem: (values: CreateCartItemValues) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: false,
    totalAmount: 0,

    fetchCartItems: async () => {
        set({ loading: true, error: false });
        try {
            const data = await Api.cart.getCart();
            set(getCartDetails(data));
        } catch (e) {
            console.error(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    updateItemQuantity: async (id, quantity) => {
        set({ loading: true, error: false });
        try {
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(data));
        } catch (e) {
            console.error(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    addCartItem: async (values) => {
        set({ loading: true, error: false });
        try {
            const data = await Api.cart.addCartItem(values);
            set(getCartDetails(data));
        } catch (e) {
            console.error(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    removeCartItem: async (id) => {
        set({ loading: true, error: false });
        try {
            await Api.cart.removeCartItem(id);
            await get().fetchCartItems();
        } catch (e) {
            console.error(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));