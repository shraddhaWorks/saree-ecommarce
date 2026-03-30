<<<<<<< HEAD
export interface Product {
  id: string | number;
  name?: string;
  title?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  description?: string;
  stock?: number;
  category?: string;
  fabric?: string;
  color?: string;
  rating?: number;
  reviewsCount?: number;
  brand?: string;
  occasion?: string;
}
=======
export type { StorefrontProduct as Product } from "@/types/storefront";
>>>>>>> cb8727c (backend)
