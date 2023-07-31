export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export type ProductProps = {
  product: Product;
};

export type ImageGalleryProps = {
  images: string[];
};

export type RatingProps = {
  rating: number;
};
