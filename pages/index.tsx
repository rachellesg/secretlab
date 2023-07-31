import { useEffect, useState } from "react";

import { fetchProducts } from "@/utils/api";
import { Product } from "@/utils/types/product";

import LoadingSpinner from "@/components/loading";
import ProductItem from "@/components/product/productItem";

interface IndexProps {
  products: Product[];
}

export async function getServerSideProps() {
  try {
    const products = await fetchProducts();
    return { props: { products } };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [] } };
  }
}

export default function Home({ products }: IndexProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    if (products) setIsLoading(false);
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
          <div className="flex flex-1 items-center space-between mb-5">
            <h1 className="text-md font-bold w-2/5 sm:w-1/2">
              {filteredProducts.length} results
            </h1>
            <div className="w-3/5 sm:w-1/2 flex justify-end items-center">
              <label>Sort by:</label>
              <select
                value={sortOption}
                onChange={handleSortOptionChange}
                className="ml-2 px-1 py-2 rounded border">
                <option value="">None</option>
                <option value="category">Category</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
