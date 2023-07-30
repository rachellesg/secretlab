import { useEffect, useState } from "react";
import Snackbar from "@/components/snackbar";
import useCartStore from "@/store/cart";
import Link from "next/link";

import EmptyCart from "@/components/cart/emptyCart";
import CartItem from "@/components/cart/cartItem";
import CartSummary from "@/components/cart/cartSummary";

const Cart: React.FC = () => {
  const { cartItems } = useCartStore();
  const cartStore = useCartStore();

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleRemoveFromCart = (id: number) => {
    cartStore.removeFromCart(id);
    setSnackbarVisible(true);
  };

  const handleClearCart = () => {
    cartStore.clearCart();
  };

  const { totalPrice, totalDiscount } = cartItems.reduce(
    (accumulator, item) => {
      const price = item.price * item.quantity;
      const discount = ((item.price * item.discount) / 100) * item.quantity;

      return {
        totalPrice: accumulator.totalPrice + price,
        totalDiscount: accumulator.totalDiscount + discount,
      };
    },
    { totalPrice: 0, totalDiscount: 0 }
  );

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
                    <CartItem
                      key={product.id}
                      item={product}
                      onRemove={handleRemoveFromCart}
                    />
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
                <CartSummary
                  totalPrice={totalPrice}
                  totalDiscount={totalDiscount}
                />
                <button className="mt-5 px-4 py-2 text-white bg-link rounded-lg hover:bg-link-hover focus:outline-none">
                  Checkout Now
                </button>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
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
