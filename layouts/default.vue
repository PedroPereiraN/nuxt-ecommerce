<script setup lang="ts">
import AppHeader from "./header.vue";
import AppFooter from './footer.vue'
</script>

<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
