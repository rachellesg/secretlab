import { create } from "zustand";
import { CartStore, Item } from "@/utils/types/cart";

const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (product: Item): void => {
    set((state) => ({
      cartItems: [...state.cartItems, product],
    }));
  },
  removeFromCart: (itemId: number): void => {
    set((state: CartStore) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    }));
  },
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
