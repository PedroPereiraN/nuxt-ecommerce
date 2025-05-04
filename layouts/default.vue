<script setup lang="ts">
import AppHeader from "./header.vue";
import AppFooter from "./footer.vue";
import MobileSearchInput from "./components/mobile-search-input.vue";
</script>

<template>
  <div>
    <AppHeader />
    <MobileSearchInput />
    <slot />
    <AppFooter />
  </div>
</template>
