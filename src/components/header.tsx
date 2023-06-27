import useCartStore from "@/store/cart";
import Link from "next/link";

const Header: React.FC<{}> = () => {
  const { cartItems } = useCartStore();

  const quantities = cartItems.map((item) => item.quantity);
  const totalQuantity = quantities.reduce((acc, quantity) => acc + quantity, 0);

  return (
    <header className="py-4 mb-10 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <Link href="/">
            <img src="/logo.svg" alt="Logo Ipsum" />
          </Link>
        </h1>
        <nav className="flex items-center">
          <Link href="/cart">
            <div className="flex items-center mr-4">
              <img src="/cart.svg" alt="Cart" className="w-5 mr-1 text-white" />
              <span className="bg-success text-xs rounded-full px-1 py-1 flex items-center justify-center w-5 h-5">
                {totalQuantity}
              </span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
