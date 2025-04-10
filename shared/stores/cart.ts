import { create } from 'zustand';
import { Api } from '../services/api-client';
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { CartStateItem, getCartDetails } from "@/shared/lib";

export interface CartState {
    loadingCart: boolean;
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    addCartItem: (values: CreateCartItemValues) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    error: false,
    loadingCart: false,
    loading: false,
    totalAmount: 0,

    fetchCartItems: async () => {
        try {
            set({ loadingCart: true, error: false });
            const data = await Api.cart.getCart();
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loadingCart: false });
        }
    },

    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    removeCartItem: async (id: number) => {
        try {
            set((state) => ({
                loadingAction: true,
                error: false,
                items: state.items.map((item) =>
                    item.id === id ? { ...item, disabled: true } : item
                ),
            }));
            const data = await Api.cart.removeCartItem(id);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set((state) => ({
                loadingAction: false,
                items: state.items.map((item) => ({ ...item, disabled: false })),
            }));
        }
    },

    addCartItem: async (values: CreateCartItemValues) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.addCartItem(values);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));