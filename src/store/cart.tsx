import { create } from "zustand";
import { CartStore, Item } from "@/utils/types/cart";
import { persist } from "zustand/middleware";

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product: Item): void => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id
          );
          if (existingItem) {
            existingItem.quantity += product.quantity;
            return {
              cartItems: [...state.cartItems],
            };
          } else {
            return {
              cartItems: [...state.cartItems, product],
            };
          }
        });
      },
      removeFromCart: (itemId: number): void => {
        set((state: CartStore) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        }));
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "SecretLab_cart",
      skipHydration: true,
    }
  )
);

export default useCartStore;
