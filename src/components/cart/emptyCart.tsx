import Link from "next/link";

const EmptyCart: React.FC = () => {
  return (
    <>
      <span className="text-md">Your cart is currently empty.</span>
      <Link
        href="/"
        className="text-link hover:text-link-hover hover:underline flex">
        Continue Shopping
      </Link>
    </>
  );
};

export default EmptyCart;
