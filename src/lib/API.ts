import type { Product, Options } from "@/types/product";

function mkURL(options?: Options): string {
  let url = "https://fakestoreapi.com/products";

  if (!options) {
    return url;
  }

  const { sort, limit, category } = options;

  if (category) {
    url += `/category/${category}`;
  }

  if (sort) {
    url += `?sort=${sort}`;
  }

  if (limit) {
    url += `&limit=${limit}`;
  }

  return url;
}

export default {
  async getProducts(options?: Options) {
    const url = mkURL(options);
    const response = await fetch(url);

    return response.json() as Promise<Product[]>;
  },
  async getCategories() {
    const url = "https://fakestoreapi.com/products/categories";
    const response = await fetch(url);

    return response.json() as Promise<string[]>;
  },
};
