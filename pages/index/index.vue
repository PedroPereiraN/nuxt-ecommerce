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
import ProductsCarousel from "~/components/ProductsCarousel.vue";

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
    <section class="my-10">
      <h2 class="font-bold text-3xl m-10">Best sellers</h2>
      <ProductsCarousel :items="bestSellers" />
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
.list-right-move,
.list-left-move,
.list-right-enter-active,
.list-left-enter-active {
  transition: all 0.3s ease-in-out;
  position: static;
}

.list-right-leave-active,
.list-left-leave-active {
  transition: all 0.3s ease-in-out;
  position: absolute;
}

.list-right-enter-from {
  transform: translateX(200%);
}

.list-right-leave-to {
  transform: translateX(-300%);
  opacity: 0;
}

.list-left-enter-from {
  transform: translateX(-200%);
}

.list-left-leave-to {
  transform: translateX(300%);
  opacity: 0;
}
</style>
