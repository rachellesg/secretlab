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
    <section>
      <h1 className="text-4xl font-bold mb-4">Product Listing</h1>
      {isLoading ? (
        "loading x"
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              className="flex flex-col h-full bg-gray-200 p-4"
              key={product.id}>
              <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
              <p>{product.description}</p>
              <div className="inline-flex flex-wrap py-4">
                <span className="px-3 py-1 mr-5 text-sm font-semibold text-white bg-red-500 rounded-full">
                  {product.rating}
                </span>
                <span className="px-3 py-1 text-sm font-semibold text-white bg-gray-500 rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="carousel">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                  />
                ))}
              </div>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
