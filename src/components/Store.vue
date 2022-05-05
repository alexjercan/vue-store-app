<script setup lang="ts">
import useProducts from "@/hooks/useProducts";

const productsState = useProducts();
</script>

<template>
  <div>
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
          <span class="card-title grey-text text-darken-4"
            >
            <h3>{{ product.title }}
            <i class="material-icons right">close</i></h3></span
          >
          <p>
            {{ product.description }}
          </p>
          <h4 class="right-align">
            {{ product.price }}$
          </h4>
          <h5>
            Category: {{ product.category }}
          </h5>
          <p>
            Rating: {{ product.rating.rate }}/5 ({{ product.rating.count }} votes)
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
