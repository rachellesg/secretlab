import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

import { fetchProducts } from "@/utils/api";
import { Product } from "@/utils/types/product";
import useCartStore from "@/store/cart";
import { Item } from "@/utils/types/cart";

import Snackbar from "@/components/snackbar";
import ImageGallery from "@/components/product/gallery";
import Rating from "@/components/product/rating";
import Link from "next/link";

const ProductDetails = () => {
  const cartStore = useCartStore();

  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

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

  const handleAddToCart = async () => {
    setIsLoading(true);
    const item: Item = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
    };
    setTimeout(() => {
      cartStore.addToCart(item);
      setSnackbarVisible(true);
      setIsLoading(false);
    }, 400);
  };

  return (
    <>
      <section className="container mx-auto flex sm:gap-5 lg:gap-10">
        <div className="w-1/2">
          <ImageGallery images={product.images} />
        </div>
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-5">
            <Rating rating={product.rating} />
          </div>
          <p className="mb-5">Brand: {product.brand}</p>
          <p className="mb-5">{product.description}</p>
          <div className="flex flex-col">
            <div>
              <span className="text-xl text-red-600 mr-5">
                Now ${product.price}
              </span>
              <span className="px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                -{Math.round(product.discountPercentage)}%
              </span>
            </div>
            <div>
              <span className="line-through text-sm">
                Was $
                {product.price +
                  Math.round(product.price / product.discountPercentage)}
              </span>
            </div>
          </div>

          <div className="my-10">
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
              disabled={isLoading}
              className={`ml-4 px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none`}>
              {isLoading ? "Adding..." : "Add to Cart"}
            </button>
          </div>

          <Link href="/" className="text-link :link-hover hover:underline flex">
            Back to products
          </Link>
        </div>
      </section>

      <Snackbar
        isVisible={snackbarVisible}
        setIsVisible={setSnackbarVisible}
        message={<>Product has been added to cart!</>}
      />
    </>
  );
};

export default ProductDetails;
