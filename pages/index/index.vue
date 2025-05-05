<script setup lang="ts">
import { ref, type Ref } from "vue";
import Product from "~/components/Product.vue";
import { getCarouselImages } from "~/services/home-queries";
import { getBestSellers, getProducts } from "~/services/product-queries";
import type {
  HomeImageCarousel,
  Product as ProductType,
} from "~/utils/api-types";
import { numberMask } from "~/utils/masks";
import MainCarousel from "./components/MainCarousel.vue";

const carouselImages: HomeImageCarousel[] = await getCarouselImages();
const bestSellers: ProductType[] = await getBestSellers();
const quantityOfProducts: Ref<number> = ref(16);
const products: Ref<ProductType[]> = ref(
  await getProducts(quantityOfProducts.value),
);

const showMoreProducts = async (): Promise<void> => {
  quantityOfProducts.value += 8;

  products.value = await getProducts(quantityOfProducts.value);
};
</script>

<template>
  <main>
    <MainCarousel :carouselImages="carouselImages" />
    <section class="mb-10 md:m-20">
      <h2 class="font-bold text-3xl m-10 md:mb-10">Best sellers</h2>
    </section>

    <section class="m-20">
      <h2 class="font-bold text-3xl mb-10">For you</h2>
      <div class="grid grid-cols-4 gap-5">
        <Product
          v-for="product in products"
          :key="product.id"
          :item="{
            image: product.imageURL,
            name: product.name,
            path: VIEW_PRODUCT(product.id),
            price: numberMask(product.price, 2),
          }"
        />
      </div>
      <div class="flex justify-center mt-10">
        <button
          type="button"
          class="flex items-center gap-2 cursor-pointer"
          @click="showMoreProducts()"
        >
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

.right-enter-active,
.left-enter-active,
.right-leave-active,
.left-leave-active {
  position: absolute;
  transition: all 0.3s ease-in-out;
}

.left-enter-from {
  transform: translateX(-100%);
}

.left-leave-to {
  transform: translateX(100%);
}

.right-enter-from {
  transform: translateX(100%);
}

.right-leave-to {
  transform: translateX(-100%);
}
</style>
