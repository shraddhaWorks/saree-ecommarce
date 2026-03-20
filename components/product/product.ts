export interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  images: string[];
  description: string;
  stock: number;
}