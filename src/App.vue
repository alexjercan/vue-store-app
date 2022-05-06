<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav>
    <div class="nav-wrapper green">
      <RouterLink class="brand-logo" to="/">Home</RouterLink>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><RouterLink to="/cart">Cart</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
    </div>
  </nav>
  <div>
    <RouterView class="container" />
  </div>
</template>
