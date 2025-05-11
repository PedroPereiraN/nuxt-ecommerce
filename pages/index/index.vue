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
const showingBestSellers: Ref<ProductType[]> = ref([]);
const showingFirstIndex: Ref<number> = ref(0);
const showingLastIndex: Ref<number> = ref(2);
showingBestSellers.value.push(bestSellers[showingFirstIndex.value]);
showingBestSellers.value.push(bestSellers[1]);
showingBestSellers.value.push(bestSellers[showingLastIndex.value]);
const canChangeImage: Ref<boolean> = ref(true);

const getIndexOfFirstShowingItem = (): number | null => {
  const firstCarouselItem = bestSellers.find(
    (bs: { id: string }) => bs.id == showingBestSellers.value[0]?.id,
  );

  if (firstCarouselItem) {
    return bestSellers.indexOf(firstCarouselItem);
  }

  return null;
};

const getIndexOfLastShowingItem = (): number | null => {
  const lastCarouselItem = bestSellers.find(
    (bs: { id: string }) => bs.id == showingBestSellers.value[2]?.id,
  );

  if (lastCarouselItem) {
    return bestSellers.indexOf(lastCarouselItem);
  }

  return null;
};

function changeProductsList(direction: "left" | "right") {
  if (canChangeImage.value) {
    carouselDirection.value = `list-${direction}`;

    if (
      direction == "left" &&
      showingBestSellers.value[0]?.id == bestSellers[0]?.id
    ) {
      showingFirstIndex.value = bestSellers.length - 1;
    } else if (direction == "left") {
      const firstIndex = getIndexOfFirstShowingItem();

      if (firstIndex) {
        showingFirstIndex.value = firstIndex - 1;
      } else {
        showingFirstIndex.value -= 1;
      }
    }

    if (
      direction == "right" &&
      showingBestSellers.value[showingBestSellers.value.length - 1]?.id ==
        bestSellers[bestSellers.length - 1]?.id
    ) {
      showingLastIndex.value = 0;
    } else if (direction == "right") {
      const lastIndex = getIndexOfLastShowingItem();

      if (lastIndex) {
        showingLastIndex.value = lastIndex + 1;
      } else {
        showingLastIndex.value += 1;
      }
    }

    if (direction == "left") {
      showingBestSellers.value.splice(showingBestSellers.value.length - 1, 1);
      showingBestSellers.value.unshift(bestSellers[showingFirstIndex.value]);
    }

    if (direction == "right") {
      showingBestSellers.value.splice(0, 1);
      showingBestSellers.value.push(bestSellers[showingLastIndex.value]);
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
          <li v-for="bestSeller in showingBestSellers" :key="bestSeller.id">
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
    {{ showingFirstIndex }}
    {{ showingLastIndex }}
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
