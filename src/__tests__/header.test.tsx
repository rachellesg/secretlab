import { render, screen } from "@testing-library/react";
import Header from "../components/header";

jest.mock("@/store/cart", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    cartItems: [
      {
        id: 1,
        title: "Product 1",
        price: 10,
        discount: 2,
        quantity: 2,
        image: "/product1.jpg",
      },
      {
        id: 2,
        title: "Product 2",
        price: 15,
        discount: 3,
        quantity: 3,
        image: "/product2.jpg",
      },
    ],
  })),
}));

test("renders the header with correct total quantity", () => {
  render(<Header />);

  const totalQuantityElement = screen.getByText(/5/i);
  expect(totalQuantityElement).toBeInTheDocument();
});
