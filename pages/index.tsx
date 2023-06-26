import { useEffect, useState } from "react";

import { fetchProducts } from "@/utils/api";
import { Product } from "@/utils/types/product";

import "@/styles/home.scss";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("");

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

  useEffect(() => {
    filterProducts();
  }, [products, sortOption]);

  const filterProducts = () => {
    let filteredList = [...products];

    if (sortOption === "category") {
      filteredList = filteredList.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    } else if (sortOption === "price") {
      filteredList = filteredList.sort((a, b) => a.price - b.price);
    } else if (sortOption === "rating") {
      filteredList = filteredList.sort((a, b) => a.rating - b.rating);
    }

    setFilteredProducts(filteredList);
  };

  const handleSortOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <section className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Product Listing</h1>
      <div className="mb-4">
        <label>Sort by:</label>
        <select
          value={sortOption}
          onChange={handleSortOptionChange}
          className="ml-2 p-2 rounded">
          <option value="">None</option>
          <option value="category">Category</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {isLoading ? (
        "loading x"
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {filteredProducts.map((product) => (
            <div
              className="flex flex-col h-full bg-white relative pb-14 pl-7 pr-7 pt-7 md:pl-4 md:pt-4 md:pr-4"
              key={product.id}>
              <div className="flex items-center justify-center w-full md:h-[150px]">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="object-cover h-full w-full"
                />
              </div>
              <h3 className="text-md mt-5 font-semibold mb-4">
                {product.title}
              </h3>
              <p>Price: ${product.price}</p>
              <Link
                href={`/product/${product.id}`}
                className="text-blue-500 hover:underline">
                View Details
              </Link>
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
