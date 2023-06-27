import { useState } from "react";
import Snackbar from "@/components/snackbar";
import useCartStore from "@/store/cart";
import Link from "next/link";

const Cart: React.FC = () => {
  const { cartItems } = useCartStore();
  const cartStore = useCartStore();
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleRemoveFromCart = (id: number) => {
    cartStore.removeFromCart(id);
    setSnackbarVisible(true);
  };

  const prices = cartItems.map((item) => item.price * item.quantity);
  const totalPrice = prices.reduce((acc, price) => acc + price, 0);

  return (
    <>
      <section className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Cart Page</h1>
        {cartItems.length !== 0 ? (
          <div className="flex gap-2 lg:gap-10">
            <div className="pb-4 w-3/4">
              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center bg-white rounded-full shadow-md p-4 mb-4">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <span className="text-gray-600">
                    Quantity: {product.quantity}
                  </span>
                  <span className="text-gray-600">Price: ${product.price}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleRemoveFromCart(product.id)}>
                    <img src="/cross.svg" alt="Remove from cart" />
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col border p-4 bg-white border-gray-200 rounded-full w-2/5">
              <div className="flex justify-between">
                <div>
                  Grand total: <span className="font-bold">${totalPrice}</span>
                </div>
              </div>
              <button className="mt-5 px-4 py-2 text-white bg-link rounded-full hover:bg-link-hover focus:outline-none">
                Checkout Now
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="text-md">Your cart is currently empty.</span>
            <Link
              href="/"
              className="text-link hover:text-link-hover hover:underline flex">
              Continue Shopping
            </Link>
          </>
        )}
      </section>

      <Snackbar
        isVisible={snackbarVisible}
        setIsVisible={setSnackbarVisible}
        message={`Product has been removed from cart`}
      />
    </>
  );
};

export default Cart;
