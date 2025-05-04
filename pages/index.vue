<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import Product from "~/components/Product.vue";

const images = [
  "https://images.unsplash.com/photo-1562577308-9e66f0c65ce5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1657974361095-4d5f3fb381fb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683977922495-3ab3ce7ba4e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29jaWFsJTIwbWVkaWElMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1661425715124-310ec1b49b8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29jaWFsJTIwbWVkaWElMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
];

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 5000,
};

const carouselConfig2 = {
  itemsToShow: 4,
  wrapAround: true,
  gap: 20,
};
</script>

<template>
  <main>
    <Carousel v-bind="carouselConfig">
      <Slide v-for="slide in images" :key="slide">
        <img :src="slide" />
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <section class="m-20">
      <h2 class="font-bold text-3xl mb-10">Best sellers</h2>

      <Carousel v-bind="carouselConfig2">
        <Slide v-for="img in images" :key="img">
          <Product
            :item="{ image: img, name: 'Product Name', path: '/', price: '00' }"
          />
        </Slide>

        <template #addons>
          <Navigation class="-mx-16" />
        </template>
      </Carousel>
    </section>

    <section class="m-20">
      <h2 class="font-bold text-3xl mb-10">For you</h2>
      <div class="grid grid-cols-4 gap-5">
        <Product
          v-for="img in images"
          :key="img"
          :item="{ image: img, name: 'Product Name', path: '/', price: '00' }"
        />
        <Product
          v-for="img in images"
          :key="img"
          :item="{ image: img, name: 'Product Name', path: '/', price: '00' }"
        />
        <Product
          v-for="img in images"
          :key="img"
          :item="{ image: img, name: 'Product Name', path: '/', price: '00' }"
        />
        <Product
          v-for="img in images"
          :key="img"
          :item="{ image: img, name: 'Product Name', path: '/', price: '00' }"
        />
      </div>
      <div class="flex justify-center mt-10">
        <button type="button" class="flex items-center gap-2 cursor-pointer">
          See more
          <Icon name="lucide:chevron-down" />
        </button>
      </div>
    </section>
  </main>
</template>

<style>
:root {
  --vc-pgn-width: 12px;
  --vc-pgn-height: 12px;
  --vc-pgn-border-radius: 6px;
}
</style>
