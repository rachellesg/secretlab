import { Product } from "@/utils/types/product";
import Link from "next/link";
import Rating from "./rating";

const ProductListing: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="relative flex flex-col h-full bg-white relative rounded-lg border animate-slide-up">
      <Link href={`/product/${product.id}`}>
        <div className="flex items-center justify-center w-full md:h-[150px]">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-cover h-full w-full rounded-tr-lg rounded-tl-lg "
          />
        </div>
        <div className="pb-16 p-4 md:pb-14 mb-2">
          <h2 className="text-sm mt-2 font-semibold">{product.title}</h2>
          <span className="line-through text-xs font-serif text-gray-400 mr-1">
            $
            {product.price +
              Math.round(product.price / product.discountPercentage)}
          </span>
          <span className="font-bold font-serif text-sm">
            ${product.price}{" "}
          </span>
        </div>
      </Link>
      <div className="flex justify-between items-center px-4 py-3 absolute bottom-0 w-full border-t-2 border-gray-100">
        <div className="text-xs font-semibold flex items-center justify-start">
          <span className="text-white bg-yellow-400 rounded-full px-2 py-1 flex items-center text-white mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 1L12.39 6.3L18.19 7.36L13.93 11.28L15.16 17L10 14.34L4.84 17L6.07 11.28L1.81 7.36L7.61 6.3L10 1z"
              />
            </svg>
            <span className="ml-1">{product.rating}</span>
          </span>
          <div className="text-gray-600 border-l-2 pl-2 border-gray-200">
            {product.brand}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-6 h-6 cursor-pointer hover:bg-primary hover:text-white flex text-md items-center justify-center font-semibold text-black bg-secondary rounded-full">
            +
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-1">
        {product.discountPercentage > 1 ? (
          <span className="text-white text-xs bg-red-500 rounded-full px-2 py-1 flex items-center text-white mr-2">
            SALE
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductListing;
