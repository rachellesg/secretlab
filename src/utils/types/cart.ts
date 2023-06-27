export type CartStore = {
  cartItems: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
};

export type Item = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  discount: number;
};
