import Link from "next/link";

const Header: React.FC<{}> = () => {
  return (
    <header className="bg-gray-900 text-white py-4 mb-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold">
          <Link href="/">Web store</Link>
        </h1>
        <nav className="flex items-center">
          <Link href="/cart">
            <div className="flex items-center mr-4">
              <img src="../assets/cart.svg" alt="Cart" />
              <span className="bg-red-500 text-white rounded-full px-2 py-1 ml-2">
                2
              </span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
