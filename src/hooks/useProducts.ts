import API from "@/lib/API";
import { reactive, watch } from "vue";
import type { Product } from "@/types/product";

interface ProductState {
  loading: boolean;
  error: string;
  products: Product[];
}

export default function useProducts(options?: any) {
  const productsState = reactive<ProductState>({
    loading: false,
    error: "",
    products: [],
  });

  async function loadData() {
    try {
      productsState.loading = true;
      productsState.error = "";
      productsState.products = [];

      productsState.products = await API.getProducts(options);
    } catch (error) {
      productsState.error = error as string;
    } finally {
      productsState.loading = false;
    }
  }

  watch(() => options, loadData, { immediate: true });

  return productsState;
}
