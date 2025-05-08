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

const carouselDirection: Ref<"list-left" | "list-right"> = ref("list-left");
const showingBestSellers: Ref<Product[]> = ref([]);
const currentFirstIndex: Ref<number> = ref(0);
const currentLastIndex: Ref<number> = ref(2);
const canChangeImage: Ref<boolean> = ref(true);
showingBestSellers.value.push(bestSellers[0]);
showingBestSellers.value.push(bestSellers[1]);
showingBestSellers.value.push(bestSellers[2]);
const firstFirstImage: ProductType = bestSellers[0];
const firstLastImage: ProductType = bestSellers[bestSellers.length - 1];

function changeProductsList(direction: "left" | "right") {
  if (canChangeImage.value) {
    carouselDirection.value = `list-${direction}`;

    if (direction == "left" && currentFirstIndex.value == 0) {
      currentFirstIndex.value = bestSellers.length - 1;
    } else if (direction == "left") {
      currentFirstIndex.value -= 1;
    }

    if (
      direction == "right" &&
      currentFirstIndex.value == bestSellers.length - 1
    ) {
      currentFirstIndex.value = 0;
    } else if (direction == "right") {
      currentFirstIndex.value += 1;
    }

    if (direction == "left" && currentLastIndex.value == 0) {
      currentLastIndex.value = 2;
    } else if (direction == "left") {
      currentLastIndex.value -= 1;
    }

    if (
      direction == "right" &&
      currentLastIndex.value == bestSellers.length - 1
    ) {
      currentLastIndex.value = 0;
    } else if (direction == "right") {
      currentLastIndex.value += 1;
    }

    if (direction == "left") {
      showingBestSellers.value.splice(showingBestSellers.value.length - 1, 1);
      showingBestSellers.value.unshift(bestSellers[currentFirstIndex.value]);
    }

    if (direction == "right") {
      showingBestSellers.value.splice(0, 1);

      showingBestSellers.value.push(bestSellers[currentLastIndex.value]);
    }

    canChangeImage.value = false;

    setTimeout(() => {
      canChangeImage.value = true;
    }, 350);
  }
}
</script>

<template>
  <main>
    <MainCarousel :carouselImages="carouselImages" />
    <section class="mb-10 md:m-20">
      <h2 class="font-bold text-3xl m-10 md:m-0 md:mb-10">Best sellers</h2>

      <div class="relative w-full overflow-hidden h-96">
        <TransitionGroup
          :name="carouselDirection"
          tag="ul"
          class="flex justify-around mx-10"
        >
          <li
            v-for="(bestSeller, index) in showingBestSellers"
            :key="bestSeller.id"
          >
            <Product
              :item="{
                image: bestSeller.imageURL,
                name: bestSeller.name,
                price: numberMask(bestSeller.price, 2),
                path: VIEW_PRODUCT(bestSeller.id),
              }"
            />
          </li>
        </TransitionGroup>
        <button
          type="button"
          class="absolute left-0 top-[40%] text-3xl cursor-pointer"
          @click="changeProductsList('left')"
        >
          <Icon name="lucide:chevron-left" />
        </button>
        <button
          type="button"
          class="absolute right-0 top-[40%] text-3xl cursor-pointer"
          @click="changeProductsList('right')"
        >
          <Icon name="lucide:chevron-right" />
        </button>
      </div>
    </section>
    {{ currentFirstIndex }}
    {{ currentLastIndex }}
    {{ bestSellers.length }}
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
.list-left-move, /* apply transition to moving elements */
.list-right-enter-active,

.list-left-leave-active,
.list-left-enter-active, {
  transition: all 0.3s ease-in-out;
}

.list-right-leave-active {
  transition: all 0.3s ease-in-out;
  position: absolute;
}

.list-right-leave-to {
  opacity: 0;
  transform: translateX(-233%);
}
.list-right-enter-from {
  opacity: 0;
  transform: translateX(233%);
}

.list-left-leave-to {
  opacity: 0;
  transform: translateX(233%);
}
.list-left-enter-from {
  opacity: 0;
  transform: translateX(-233%);
}
</style>
