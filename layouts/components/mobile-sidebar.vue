<script setup lang="ts">
import type { AccordionItem } from "@/utils/types";
import Accordion from "~/components/ui/Accordion.vue";

const mobileSidebarItems: AccordionItem[] = [
  {
    value: "categories",
    icon: "lucide:shapes",
    title: "Categories",
    contents: [
      {
        label: "option 1",
        type: "router",
        route: "/",
      },
    ],
  },
  {
    value: "user",
    title: "User",
    icon: "lucide:user",
    contents: [
      {
        label: "option 1",
        type: "router",
        route: "/",
      },
    ],
  },
];

const emits = defineEmits(["close"]);
</script>

<template>
  <div
    class="w-screen h-screen z-40 bg-transparent fixed top-0 right-0 flex items-start justify-end"
  >
    <div class="h-full w-2/3 bg-ecommerce-sage shadow-lg">
      <button
        class="text-center w-11/12 bg-ecommerce-sage brightness-90 py-2 mx-2 my-4 rounded-lg px-6 text-lg cursor-pointer flex items-center justify-between ease-in duration-150"
        type="button"
        @click="emits('close', false)"
      >
        <p>Menu</p>
        <Icon name="lucide:menu" class="text-2xl" />
      </button>
      <Accordion :items="mobileSidebarItems" />
      <NuxtLink
        :to="CART"
        class="text-center w-11/12 bg-ecommerce-sage hover:brightness-90 py-2 mx-2 my-4 rounded-lg px-6 text-lg cursor-pointer flex items-center gap-1 active:brightness-90 ease-in duration-150"
      >
        <Icon name="lucide:shopping-cart" width="24" height="24" />
        <p>Cart</p>
      </NuxtLink>
    </div>
  </div>
</template>
