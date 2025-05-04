<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import Product from "~/components/Product.vue";
import {
  getCarouselImages,
  getBestSellers,
  getProducts,
} from "~/services/home-queries";

const carouselImages = await getCarouselImages();
const bestSellers = await getBestSellers();
const products = await getProducts();

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 5000,
};

const bestSellersCarouselConfig = {
  itemsToShow: 4,
  wrapAround: true,
  gap: 20,
};
</script>

<template>
  <main>
    <Carousel v-bind="carouselConfig">
      <Slide v-for="slide in carouselImages" :key="slide.id">
        <img :src="slide.image" />
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <section class="m-20">
      <h2 class="font-bold text-3xl mb-10">Best sellers</h2>

      <Carousel v-bind="bestSellersCarouselConfig">
        <Slide v-for="bestSeller in bestSellers" :key="bestSeller.id">
          <Product
            :item="{
              image: bestSeller.image,
              name: bestSeller.name,
              path: VIEW_PRODUCT(bestSeller.id),
              price: bestSeller.price,
            }"
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
          v-for="product in products"
          :key="product.id"
          :item="{
            image: product.image,
            name: product.name,
            path: VIEW_PRODUCT(product.id),
            price: product.price,
          }"
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
