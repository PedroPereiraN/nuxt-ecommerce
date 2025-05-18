<script setup lang="ts">
import type { Product as ProductType } from "~/utils/api-types";

export type Props = {
  items: ProductType[];
};

const props = defineProps<Props>();

const windowWidth = window?.innerWidth;
const touchStartX: Ref<number> = ref(0);
const carouselDirection: Ref<"list-left" | "list-right"> = ref("list-left");
const showingProducts: Ref<ProductType[]> = ref([]);
const showingFirstIndex: Ref<number> = ref(0);
const showingLastIndex: Ref<number> = ref(0);
const canChangeImage: Ref<boolean> = ref(true);

if (windowWidth <= 512) {
  showingLastIndex.value = 0;
}

if (windowWidth <= 768 && windowWidth > 512) {
  showingLastIndex.value = 1;
}

if (windowWidth <= 1344 && windowWidth > 768) {
  showingLastIndex.value = 2;
}

if (windowWidth > 1344) {
  showingLastIndex.value = 3;
}

for (let i = 0; i <= showingLastIndex.value; i++) {
  showingProducts.value.push(props.items[i]);
}

const getIndexOfFirstShowingItem = (): number | null => {
  const firstCarouselItem = props.items.find(
    (bs: { id: string }) => bs.id == showingProducts.value[0]?.id,
  );

  if (firstCarouselItem) {
    return props.items.indexOf(firstCarouselItem);
  }

  return null;
};

const getIndexOfLastShowingItem = (): number | null => {
  const lastCarouselItem = props.items.find(
    (bs: { id: string }) =>
      bs.id == showingProducts.value[showingProducts.value.length - 1]?.id,
  );

  if (lastCarouselItem) {
    return props.items.indexOf(lastCarouselItem);
  }

  return null;
};

function changeProductsList(direction: "left" | "right") {
  if (canChangeImage.value) {
    carouselDirection.value = `list-${direction}`;

    if (
      direction == "left" &&
      showingProducts.value[0]?.id == props.items[0]?.id
    ) {
      showingFirstIndex.value = props.items.length - 1;
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
      showingProducts.value[showingProducts.value.length - 1]?.id ==
        props.items[props.items.length - 1]?.id
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
      showingProducts.value.splice(showingProducts.value.length - 1, 1);
      showingProducts.value.unshift(props.items[showingFirstIndex.value]);
    }

    if (direction == "right") {
      showingProducts.value.splice(0, 1);
      showingProducts.value.push(props.items[showingLastIndex.value]);
    }

    canChangeImage.value = false;

    setTimeout(() => {
      canChangeImage.value = true;
    }, 350);
  }
}

function checkEndTouch(endTouchPosition: number) {
  const touchDifference = touchStartX.value - endTouchPosition;

  if (touchDifference > 0) {
    changeProductsList("right");
  } else {
    changeProductsList("left");
  }
}
</script>

<template>
  <div
    class="relative overflow-hidden h-96 px-10"
    @touchstart="(e: any) => (touchStartX = e.touches[0].clientX)"
    @touchmove="(e: any) => checkEndTouch(e.touches[0].clientX)"
  >
    <TransitionGroup
      :name="carouselDirection"
      tag="ul"
      class="flex justify-center gap-10 xl:gap-20"
    >
      <li v-for="product in showingProducts" :key="product.id">
        <Product
          :item="{
            image: product.imageURL,
            name: product.name,
            price: numberMask(product.price, 2),
            path: VIEW_PRODUCT(product.id),
          }"
        />
      </li>
    </TransitionGroup>
    <button
      type="button"
      class="hidden lg:block absolute left-0 xl:left-6 top-[40%] text-3xl cursor-pointer"
      @click="changeProductsList('left')"
    >
      <Icon name="lucide:chevron-left" />
    </button>
    <button
      type="button"
      class="hidden lg:block absolute right-0 xl:right-6 top-[40%] text-3xl cursor-pointer"
      @click="changeProductsList('right')"
    >
      <Icon name="lucide:chevron-right" />
    </button>
  </div>
</template>
