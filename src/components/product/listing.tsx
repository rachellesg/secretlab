import { Product } from "@/utils/types/product";
import Link from "next/link";

const ProductListing: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <>
      <div className="relative flex flex-col h-full bg-white relative p-7 md:p-4">
        <div className="flex items-center justify-center w-full md:h-[150px]">
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-cover h-full w-full"
          />
        </div>
        <h3 className="text-md mt-5 font-semibold mb-4">{product.title}</h3>
        <p>Price: ${product.price}</p>
        <Link
          href={`/product/${product.id}`}
          className="text-blue-500 hover:underline">
          View Details
        </Link>
        {product.discountPercentage > 0 ? (
          <div className="absolute text-xs p-1 bg-red-600 text-white r-0 top-3">
            -{product.discountPercentage}%
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProductListing;
