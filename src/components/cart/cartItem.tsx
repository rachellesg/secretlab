import { CartItemProps } from "@/utils/types/cart";
import Link from "next/link";

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const handleRemoveClick = () => {
    onRemove(item.id);
  };

  return (
    <div className="flex justify-between bg-white p-4 mb-4 border-b w-full">
      <img src={item.image} alt={item.title} className="w-1/6" />
      <div className="w-3/6 px-5">
        <span>
          <Link href={`/product/${item.id}`}>
            <h2 className="text-lg font-semibold hover:text-primary hover:underline">
              {item.title}
            </h2>
            ${item.price}
            <span className="line-through text-xs text-gray-500 ml-1">
              ${item.price + Math.round(item.price / item.discount)}
            </span>
          </Link>
        </span>
      </div>
      <span className="text-gray-600 w-1/6 flex justify-center">
        {item.quantity}
      </span>
      <span
        className="cursor-pointer flex justify-end items-start w-1/6"
        onClick={handleRemoveClick}>
        <img
          src="/cross.svg"
          alt="Remove from cart"
          className="border-white w-5 hover:border-gray-500"
        />
      </span>
    </div>
  );
};

export default CartItem;
