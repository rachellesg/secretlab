import { Product } from "@/utils/types/product";
import Link from "next/link";

const ProductListing: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <>
      <div className="relative flex flex-col h-full bg-white relative rounded-lg">
        <Link href={`/product/${product.id}`}>
          <div className="flex items-center justify-center w-full md:h-[150px]">
            <img
              src={product.images[0]}
              alt={product.title}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="p-7 md:p-4">
            <span className="font-bold">${product.price} </span>
            <span className="line-through text-sm text-gray-400">
              $
              {product.price +
                Math.round(product.price / product.discountPercentage)}
            </span>
            <h2 className="text-sm mt-2 font-semibold">{product.title}</h2>
          </div>
        </Link>
        <div className="flex space-between p-7 md:p-4">
          <div className="w-1/3 px-2 py-1 text-sm font-semibold text-white bg-yellow-500 rounded-full">
            <div className="text-white flex items-center">
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
            </div>
          </div>
          <div className="w-3/4 flex justify-end">+</div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
