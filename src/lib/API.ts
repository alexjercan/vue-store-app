import type { Product } from "@/types/product";

export default {
  async getProducts(options?: any) {
    const url = 'https://fakestoreapi.com/products';
    const response = await fetch(url);

    return response.json() as Promise<Product[]>;
  }
}