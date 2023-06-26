import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

import { fetchProducts } from "@/utils/api";
import { Product } from "@/utils/types/product";
import useCartStore from "@/store/cart";
import { Item } from "@/utils/types/cart";

const ProductDetails = () => {
  const cartStore = useCartStore();

  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const products = await fetchProducts();
        const selectedProduct = products.find((p) => p.id === Number(id));
        setProduct(selectedProduct || null);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (id) {
      fetchProductsData();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    const item: Item = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
    };
    cartStore.addToCart(item);
  };

  return (
    <section className="container mx-auto flex gap-10">
      <div>
        {product.images.map((image, idx) => (
          <div className="" key={image}>
            <img src={image} alt={`${product.title}-${idx}`} />
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
        <div className="flex items-center mb-5">
          <div className="flex items-center mr-2">
            {[1, 2, 3, 4, 5].map((value) => {
              const isFilled = value <= Math.floor(product.rating);
              const isHalfFilled =
                value === Math.ceil(product.rating) &&
                product.rating % 1 >= 0.5;

              return (
                <div
                  key={value}
                  className={`${
                    isFilled
                      ? "text-yellow-500"
                      : isHalfFilled
                      ? "text-yellow-500"
                      : "text-gray-300"
                  } text-2xl focus:outline-none`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill={isFilled || isHalfFilled ? "currentColor" : "none"}
                    viewBox="0 0 20 20"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 1L12.39 6.3L18.19 7.36L13.93 11.28L15.16 17L10 14.34L4.84 17L6.07 11.28L1.81 7.36L7.61 6.3L10 1z"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
          <div>{product.rating}/5 rating</div>
        </div>
        <p className="mb-5">{product.description}</p>
        <p>
          <span className="text-xl text-red-600">
            $
            {product.price -
              Math.round(product.price / product.discountPercentage)}
          </span>
          {Math.round(product.discountPercentage)}%
          <span className="line-through">${product.price}</span>
        </p>

        <p>
          {product?.stock > 1 && product?.stock !== 0
            ? `In Stock`
            : "Currently Unavailable"}
        </p>

        <p>
          <button
            onClick={handleDecrease}
            className="w-10 h-10 px-2 text-center border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500">
            -
          </button>
          <input
            type="text"
            inputMode="numeric"
            pattern="[1-9]*"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 h-10 px-2 text-center border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          />
          <button
            onClick={handleIncrease}
            className="w-10 h-10 px-2 text-center border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500">
            +
          </button>
          <button
            onClick={handleAddToCart}
            className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">
            Add to Cart
          </button>
        </p>
      </div>
    </section>
  );
};

export default ProductDetails;
