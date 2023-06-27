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

  const discounts = cartItems.map((item) => item.discount);
  const totalDiscount = discounts.reduce((acc, discount) => acc + discount, 0);

  return (
    <>
      <section className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Cart:</h1>
        {cartItems.length !== 0 ? (
          <>
            <div className="flex sm:flex-row flex-col gap-5 lg:gap-10">
              <div className="pb-4 w-full sm:w-3/5 lg:w-4/6">
                <p>
                  Here, you can review the items you have selected for purchase.
                  Please ensure that the quantities listed are correct before
                  proceeding to checkout.
                </p>
                <div className="border rounded-lg my-5">
                  <div className="flex justify-between bg-white p-4 mb-4 border-b w-full">
                    <div className="w-1/6" />
                    <div className="w-3/6 px-5">
                      <span className="">
                        <h2 className="text-lg font-semibold">Product</h2>
                      </span>
                    </div>
                    <span className="text-gray-600 w-1/6 flex justify-center">
                      Quantity
                    </span>
                    <span className="cursor-pointer flex justify-end items-start w-1/6"></span>
                  </div>
                  {cartItems.map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between bg-white p-4 mb-4 border-b w-full">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-1/6"
                      />
                      <div className="w-3/6 px-5">
                        <span className="">
                          <h2 className="text-lg font-semibold">
                            {product.title}
                          </h2>
                          ${product.price}
                          <span className="line-through text-xs text-gray-500 ml-1">
                            $
                            {product.price +
                              Math.round(product.price / product.discount)}
                          </span>
                        </span>
                      </div>
                      <span className="text-gray-600 w-1/6 flex justify-center">
                        {product.quantity}
                      </span>
                      <span
                        className="cursor-pointer flex justify-end items-start w-1/6"
                        onClick={() => handleRemoveFromCart(product.id)}>
                        <img
                          src="/cross.svg"
                          alt="Remove from cart"
                          className="border-white w-5 hover:border-gray-500"
                        />
                      </span>
                    </div>
                  ))}
                  <div className="px-4 pb-4 flex justify-between items-center">
                    <Link
                      href="/"
                      className="text-link hover:text-link-hover hover:underline flex">
                      &laquo; Continue Shopping
                    </Link>
                    <button
                      onClick={handleClearCart}
                      className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-200 focus:outline-none">
                      Remove All
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full sm:w-2/5 lg:w-2/6">
                <div className="flex justify-between items-center my-2">
                  <div>Subtotal:</div>
                  <div className="font-bold">${totalPrice}</div>
                </div>
                <div className="flex justify-between items-center text-gray-400 my-2">
                  <div>Total savings:</div>
                  <div>${Math.round(totalDiscount)}</div>
                </div>
                <div className="flex justify-between items-center border-t mt-5 pt-5">
                  <div>Grand total:</div>
                  <div className="font-bold">${totalPrice}</div>
                </div>
                <button className="mt-5 px-4 py-2 text-white bg-link rounded-lg hover:bg-link-hover focus:outline-none">
                  Checkout Now
                </button>
              </div>
            </div>
          </>
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
