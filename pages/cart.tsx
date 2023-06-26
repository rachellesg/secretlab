import useCartStore from "@/store/cart";
import Link from "next/link";

const Cart: React.FC = () => {
  const { cartItems } = useCartStore();
  const cartStore = useCartStore();

  const handleRemoveFromCart = (id: number) => {
    cartStore.removeFromCart(id);
  };

  const prices = cartItems.map((item) => item.price * item.quantity);
  const totalPrice = prices.reduce((acc, price) => acc + price, 0);

  return (
    <section className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cart Page</h1>
      {cartItems.length !== 0 ? (
        <>
          <div className="border-b pb-4 border-gray-300">
            {cartItems.map((product) => (
              <div
                key={product.id}
                className="flex justify-between bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <span className="text-gray-600">
                  Quantity: {product.quantity}
                </span>
                <span className="text-gray-600">Price: ${product.price}</span>
                <span onClick={() => handleRemoveFromCart(product.id)}>
                  Remove
                </span>
              </div>
            ))}
          </div>
          <div className="flex mt-5 flex-col">
            <div>Order total: ${totalPrice}</div>
            <button className="mt-3 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">
              Checkout
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="text-md">Your cart is currently empty.</span>
          <Link href="/" className="text-blue-500 hover:underline flex">
            Continue Shopping
          </Link>
        </>
      )}
    </section>
  );
};

export default Cart;
