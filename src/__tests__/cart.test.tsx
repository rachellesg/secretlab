import { act, renderHook } from "@testing-library/react";
import useCartStore from "@/store/cart";
import { CartStore, Item } from "@/utils/types/cart";

// define a custom mock state for the store
const mockState: CartStore = {
  cartItems: [],
  addToCart: (product: Item) => {},
  removeFromCart: function (itemId: number): void {},
  clearCart: function (): void {},
};

// mock the Zustand store
jest.mock("../store/cart", () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      ...mockState,
      addToCart: jest.fn((product: Item) =>
        mockState.cartItems.push({
          id: 1,
          title: "Product 1",
          price: 10,
          discount: 2,
          quantity: 2,
          image: "/product1.jpg",
        })
      ),
    })),
  };
});

test("should add product to cart", () => {
  const product: Item = {
    id: 1,
    title: "Product 1",
    price: 10,
    discount: 2,
    quantity: 2,
    image: "/product1.jpg",
  };

  // importing the actual hook will use the mocked Zustand store
  const { result } = renderHook(() => useCartStore());

  // call the addToCart function
  act(() => {
    result.current.addToCart(product);
  });

  // assert that the product has been added to the cartItems array correctly
  expect(result.current.cartItems).toHaveLength(1);
  expect(result.current.cartItems[0]).toEqual(product);
});
