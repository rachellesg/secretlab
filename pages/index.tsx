import { useEffect, useState } from "react";

import { fetchProducts } from "@/utils/api";
import { Product } from "@/utils/types/product";

import "@/styles/home.scss";
import Link from "next/link";
import LoadingSpinner from "@/components/loading";
import ProductListing from "@/components/product/listing";

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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredProducts.map((product) => (
              <ProductListing key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
