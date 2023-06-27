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
              className={`ml-4 px-10 py-2 bg-primary text-white rounded-full hover:bg-white hover:bg-gray-900 focus:outline-none`}>
              {isLoading ? "Adding to cart..." : "Add to Cart"}
            </button>
          </div>

          <Link href="/" className="text-link :link-hover hover:underline">
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
