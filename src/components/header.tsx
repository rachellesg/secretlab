import { useEffect, useState } from "react";
import useCartStore from "@/store/cart";

import Image from "next/image";
import Link from "next/link";

const Header: React.FC<{}> = () => {
  const { cartItems } = useCartStore();

  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const quantities = cartItems.map((item) => item.quantity);
  const totalQuantity = quantities.reduce((acc, quantity) => acc + quantity, 0);

  useEffect(() => {
    setIsUpdated(true);

    const timeout = setTimeout(() => {
      setIsUpdated(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [totalQuantity]);

  return (
    <header className="py-4 px-10 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo Ipsum"
              className="animate-fade-in"
            />
          </Link>
        </h1>
        <nav className="flex items-center">
          <Link href="/cart">
            <div className="flex items-center mr-4">
              <Image
                src="/cart.svg"
                alt="Cart"
                className="animate-rotate-in w-5 mr-1 text-white"
              />
              <span
                className={`${
                  isUpdated ? "animate-enlarge " : ""
                }bg-secondary text-xs rounded-full px-1 py-1 flex items-center justify-center w-5 h-5`}>
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
