<script setup lang="ts">
import { ref, TransitionGroup, type Ref } from "vue";
import Product from "~/components/Product.vue";
import { getCarouselImages } from "~/services/home-queries";
import { getBestSellers, getProducts } from "~/services/product-queries";
import type {
  HomeImageCarousel,
  Product as ProductType,
} from "~/utils/api-types";
import { numberMask } from "~/utils/masks";

const carouselImages: HomeImageCarousel[] = await getCarouselImages();
const bestSellers: ProductType[] = await getBestSellers();
const quantityOfProducts: Ref<number> = ref(16);
const products: Ref<ProductType[]> = ref(
  await getProducts(quantityOfProducts.value),
);
const carouselDirection: Ref<"left" | "right"> = ref("left");
const showingImage: Ref<number> = ref(1);

const showMoreProducts = async (): Promise<void> => {
  quantityOfProducts.value += 8;

  products.value = await getProducts(quantityOfProducts.value);
};

const canChangeAgain: Ref<boolean> = ref(true);

function changeImage(direction: "left" | "right") {
  if (canChangeAgain.value) {
    carouselDirection.value = direction;
    if (direction == "left" && showingImage.value > 0) {
      showingImage.value -= 1;
    } else if (direction == "left" && showingImage.value == 0) {
      showingImage.value = carouselImages.length - 1;
    } else if (
      direction == "right" &&
      showingImage.value < carouselImages.length - 1
    ) {
      showingImage.value += 1;
    } else if (
      direction == "right" &&
      showingImage.value == carouselImages.length - 1
    ) {
      showingImage.value = 0;
    }

    canChangeAgain.value = false;

    setTimeout(() => {
      canChangeAgain.value = true;
    }, 350);
  }
}

function goToImage(index: number) {
  if (canChangeAgain.value) {
    if (index > showingImage.value) {
      carouselDirection.value = "right";
      showingImage.value = index;
    }

    if (index < showingImage.value) {
      carouselDirection.value = "left";
      showingImage.value = index;
    }

    canChangeAgain.value = false;

    setTimeout(() => {
      canChangeAgain.value = true;
    }, 350);
  }
}
</script>

<template>
  <main>
    <div class="relative w-screen aspect-video overflow-hidden">
      <template v-for="(image, index) in carouselImages" :key="index">
        <Transition :name="carouselDirection">
          <img
            :src="image.imageURL"
            v-if="showingImage == index"
            alt="Carousel item"
            class="w-full h-full"
          />
        </Transition>
      </template>
      <button
        type="button"
        class="absolute left-2 md:left-6 top-[50%] text-3xl cursor-pointer"
        @click="changeImage('left')"
      >
        <Icon name="lucide:chevron-left" />
      </button>
      <button
        type="button"
        class="absolute right-2 md:right-6 top-[50%] text-3xl cursor-pointer"
        @click="changeImage('right')"
      >
        <Icon name="lucide:chevron-right" />
      </button>
      <div
        class="flex gap-1 items-center justify-center absolute z-20 bottom-2 w-full"
      >
        <button
          class="cursor-pointer"
          v-for="(ball, i) in carouselImages"
          :key="ball.id"
          @click="goToImage(i)"
        >
          <Icon
            name="material-symbols:circle"
            :class="i == showingImage ? 'text-gray-600' : 'text-gray-400'"
          />
        </button>
      </div>
    </div>
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
