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
import LoadingSpinner from "@/components/loading";

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
    return <LoadingSpinner />;
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
      image: product.thumbnail,
      quantity: quantity,
      discount: product.discountPercentage,
    };
    setTimeout(() => {
      cartStore.addToCart(item);
      setSnackbarVisible(true);
      setIsLoading(false);
    }, 400);
  };

  return (
    <>
      <section className="container mx-auto flex md:flex-row flex-col sm:gap-5 lg:gap-10">
        <div className="w-full md:w-2/5 animate-fade-in">
          <div className="text-xs mb-3">
            <Link href="/" className="text-link :link-hover hover:underline">
              Home
            </Link>{" "}
            / {product.title}
          </div>
          <ImageGallery images={product.images} />
        </div>
        <div className="w-full md:w-3/5 animate-fade-in ">
          <h1 className="text-4xl font-bold my-4 uppercase">{product.title}</h1>
          <div className="flex items-center mb-5">
            <Rating rating={product.rating} />
          </div>

          <div className="flex text-3xl mb-10 font-serif">
            <span className="line-through mr-2">
              $
              {product.price +
                Math.round(product.price / product.discountPercentage)}
            </span>
            <span className="text-red-600 font-bold">${product.price}</span>
          </div>
          <p className="mb-5">{product.description}</p>

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
              className="w-16 h-10 px-2 text-center border focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            />
            <button
              onClick={handleIncrease}
              className="w-10 h-10 px-2 text-center border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500">
              +
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`sm:ml-4 mt-4 sm:m-0 w-full sm:w-auto px-10 py-2 bg-primary text-white rounded-full hover:text-black hover:bg-secondary focus:outline-none`}>
              {isLoading ? "Adding to cart..." : "Add to Cart"}
            </button>
          </div>

          <div className="border-t flex text-xs justify-between pt-3">
            <span>Brand: {product.brand}</span>
            <span>Category: {product.category}</span>
          </div>
        </div>
      </section>

      <Snackbar
        isVisible={snackbarVisible}
        setIsVisible={setSnackbarVisible}
        message={
          <Link href="/cart" className="hover:underline">
            Product has been added to cart!
          </Link>
        }
      />
    </>
  );
};

export default ProductDetails;
