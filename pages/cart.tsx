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

  const handleClearCart = () => {
    cartStore.clearCart();
  };

  const prices = cartItems.map((item) => item.price * item.quantity);
  const totalPrice = prices.reduce((acc, price) => acc + price, 0);

  return (
    <>
      <section className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Cart:</h1>
        {cartItems.length !== 0 ? (
          <div className="flex sm:flex-row flex-col gap-2 lg:gap-10">
            <div className="pb-4 w-full sm:w-3/5">
              <p>
                Here, you can review the items you have selected for purchase.
                Please ensure that the quantities listed are correct before
                proceeding to checkout.
              </p>
              <div className="border p-4 rounded-lg my-5">
                {cartItems.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between bg-white p-4 mb-4 border-b">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-1/5"
                    />
                    <div className="w-2/5">
                      <span className="">
                        <h2 className="text-lg font-semibold">
                          {product.title}
                        </h2>
                        Price: ${product.price}
                        <span className="line-through text-sm text-gray-500 ml-1">
                          $
                          {product.price +
                            Math.round(product.price / product.discount)}
                        </span>
                      </span>
                    </div>
                    <span className="text-gray-600">{product.quantity}</span>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleRemoveFromCart(product.id)}>
                      <img src="/cross.svg" alt="Remove from cart" />
                    </span>
                  </div>
                ))}
                <button
                  onClick={handleClearCart}
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-200 focus:outline-none">
                  Remove All
                </button>
              </div>
            </div>
            <div className="flex flex-col border p-4 bg-white border-gray-200 rounded-lg w-full sm:w-2/5">
              <div className="flex justify-between">
                <div>
                  Grand total: <span className="font-bold">${totalPrice}</span>
                </div>
              </div>
              <button className="mt-5 px-4 py-2 text-white bg-link rounded-lg hover:bg-link-hover focus:outline-none">
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
