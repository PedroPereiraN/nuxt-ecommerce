<script setup lang="ts">
export type Props = {
  item: {
    image: string;
    name: string;
    price: string;
    path: string;
  };
};

const props = defineProps<Props>();
</script>

<template>
  <NuxtLink :to="props.item.path">
    <img
      :src="props.item.image"
      class="w-52 sm:w-64 lg:w-72 aspect-square rounded"
    />
    <p class="font-bold text-xl mt-1">{{ props.item.name }}</p>
    <p class="">$ {{ props.item.price }}</p>
  </NuxtLink>
</template>
