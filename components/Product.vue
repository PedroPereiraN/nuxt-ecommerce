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
    <img :src="props.item.image" class="w-64 aspect-square" />
    <p class="font-bold text-xl mt-1">{{ props.item.name }}</p>
    <p class="">$ {{ props.item.price }}</p>
  </NuxtLink>
</template>
