export type CartStore = {
  cartItems: Item[];
  addToCart: (product: Item) => void;
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

export type CartItemProps = {
  item: Item;
  onRemove: (id: number) => void;
};
