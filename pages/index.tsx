import { useEffect, useState } from "react";

import { fetchProducts } from "@/utils/api";
import { Product } from "@/utils/types";

import "@/styles/home.scss";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  return (
    <section className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Product Listing</h1>
      {isLoading ? (
        "loading x"
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <div
              className="flex flex-col h-full bg-white relative pb-14 pl-7 pr-7 pt-7 md:pl-4 md:pt-4 md:pr-4 !important"
              key={product.id}>
              <img src={product.images[0]} alt={product.title} />
              <h3 className="text-md mt-5 font-semibold mb-4">
                {product.title}
              </h3>
              <p>Price: ${product.price}</p>
              <div className="flex flex-wrap py-4 absolute bottom-0">
                <span className="px-3 py-1 mr-2 text-sm font-semibold text-white bg-red-500 rounded-full">
                  {product.rating}
                </span>
                <span className="px-3 py-1 text-sm font-semibold text-white bg-gray-500 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
