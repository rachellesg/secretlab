import { Product } from "./types";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data: { products: Product[] } = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
