import useCartStore from "@/store/cart";
import Link from "next/link";

const Cart: React.FC = () => {
  const { cartItems } = useCartStore();

  return (
    <section className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cart Page</h1>
      {cartItems.length !== 0 ? (
        cartItems.map((product) => (
          <div
            key={product.id}
            className="flex justify-between bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <span className="text-gray-600">Quantity: {product.quantity}</span>
            <span className="text-gray-600">Price: ${product.price}</span>
          </div>
        ))
      ) : (
        <Link href="/" className="text-blue-500 hover:underline">
          Continue Shopping
        </Link>
      )}
    </section>
  );
};

export default Cart;
