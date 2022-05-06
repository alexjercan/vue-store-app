<script setup lang="ts">
import API from "@/lib/API";
import type { Product, TSort } from "@/types/product";
import { reactive, ref, watch } from "vue";

interface CategoryState {
  loading: boolean;
  error: string;
  categories: string[];
}

interface ProductState {
  loading: boolean;
  error: string;
  products: Product[];
}

const categoryRef = ref(undefined);
const sortRef = ref<TSort>("asc");

const categoriesState = reactive<CategoryState>({
  loading: false,
  error: "",
  categories: [],
});

const productsState = reactive<ProductState>({
  loading: false,
  error: "",
  products: [],
});

async function getProducts() {
  console.log(categoryRef.value);
  try {
    productsState.loading = true;
    productsState.error = "";
    productsState.products = [];

    productsState.products = await API.getProducts({
      sort: sortRef.value,
      category: categoryRef.value,
    });
  } catch (error) {
    productsState.error = error as string;
  } finally {
    productsState.loading = false;
  }
}

async function getCategories() {
  try {
    categoriesState.loading = true;
    categoriesState.error = "";
    categoriesState.categories = [];

    categoriesState.categories = await API.getCategories();
  } catch (error) {
    categoriesState.error = error as string;
  } finally {
    categoriesState.loading = false;
  }
}

watch(() => [sortRef.value, categoryRef.value], getProducts, {
  immediate: true,
});
watch(() => [], getCategories, { immediate: true });
</script>

<template>
  <div>
    <form class="row" action="#">
      <div class="col s6">
        <p>Category</p>
        <p v-for="category in categoriesState.categories" :key="category">
          <label :for="category">
            <input
              name="group1"
              type="radio"
              :id="category"
              :value="category"
              v-model="categoryRef"
            />
            <span>{{ category }}</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name="group1"
              type="radio"
              :value="undefined"
              v-model="categoryRef"
            />
            <span>All</span>
          </label>
        </p>
      </div>

      <div class="col s6">
        <p>Sort</p>
        <p v-for="sort in ['asc', 'desc']" :key="sort">
          <label :for="sort">
            <input
              name="group2"
              type="radio"
              :id="sort"
              :value="sort"
              v-model="sortRef"
            />
            <span>{{ sort }}</span>
          </label>
        </p>
      </div>
    </form>

    <div v-if="productsState.loading" class="progress green lighten-3">
      <div class="indeterminate green"></div>
    </div>
    <div v-if="productsState.error" class="card red">
      <div class="card-content white-text">
        <span class="card-title">{{ productsState.error }}</span>
      </div>
    </div>

    <div class="grid">
      <div
        class="card"
        v-for="product in productsState.products"
        :key="product.id"
      >
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" :src="product.image" />
        </div>

        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4"
            >{{ product.title
            }}<i class="material-icons right">more_vert</i></span
          >
          <p><a href="#">This is a link</a></p>
        </div>

        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
            <h3>
              {{ product.title }} <i class="material-icons right">close</i>
            </h3></span
          >
          <p>
            {{ product.description }}
          </p>
          <h4 class="right-align">{{ product.price }}$</h4>
          <h5>Category: {{ product.category }}</h5>
          <p>
            Rating: {{ product.rating.rate }}/5 ({{ product.rating.count }}
            votes)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(3, minmax(1px, 100%));
}
</style>
