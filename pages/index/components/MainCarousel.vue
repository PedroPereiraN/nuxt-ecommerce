<script setup lang="ts">
export type Props = {
  carouselImages: HomeImageCarousel[];
};

const { carouselImages } = defineProps<Props>();

const canChangeAgain: Ref<boolean> = ref(true);
const carouselDirection: Ref<"left" | "right"> = ref("left");
const showingImage: Ref<number> = ref(0);

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
</template>

<style>
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
