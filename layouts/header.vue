<script setup lang="ts">
import Dropdown from "~/components/ui/Dropdown.vue";
import Select from "~/components/ui/Select.vue";
import SelectItem from "~/components/ui/SelectItem.vue";
import { CART } from "@/utils/paths";
import Accordion from "~/components/ui/Accordion.vue";
import type { AccordionItem } from "@/utils/types";

const userItems = [
  {
    value: "profile",
    label: "profile",
  },
  {
    value: "requests",
    label: "requests",
  },
];

const mobileSidebarItems: AccordionItem[] = [
  {
    value: "categories",
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
</script>

<template>
  <header
    class="flex justify-between px-10 py-2 items-center bg-ecommerce-sage font-medium"
  >
    <!-- sidebar menu when its mobile screen -->
    <div
      class="w-screen h-screen z-40 bg-transparent fixed top-0 right-0 flex items-start justify-end"
    >
      <div class="h-full w-2/3 bg-ecommerce-sage shadow-lg">
        <Accordion :items="mobileSidebarItems" />
        <NuxtLink
          :to="CART"
          class="px-6 py-2 bg-transparent text-lg border-b w-full flex items-center gap-1"
        >
          <Icon name="lucide:shopping-cart" width="24" height="24" />
          <p>Cart</p>
        </NuxtLink>
      </div>
    </div>
    <div class="flex gap-4 items-center">
      <NuxtLink to="/"
        ><img src="@/assets/img/logo.svg" alt="logo" class="w-12"
      /></NuxtLink>
      <div class="w-full hidden md:block">
        <Select placeholder="Categories" variant="transparent">
          <SelectItem value="1"> opção 1 </SelectItem>
        </Select>
      </div>
    </div>
    <div class="hidden md:block relative w-fit">
      <input class="rounded-full h-8 w-96 px-4 bg-white" placeholder="Search" />
      <Icon
        name="lucide:search"
        width="24"
        height="24"
        class="absolute top-2 right-4"
      />
    </div>
    <button type="button" class="cursor-pointer">
      <Icon name="lucide:menu" class="text-2xl" />
    </button>
    <div class="hidden md:block flex items-center gap-4">
      <Dropdown label="User" labelIcon="lucide:user" :items="userItems" />
      <NuxtLink :to="CART" class="flex items-center gap-1">
        <Icon name="lucide:shopping-cart" width="24" height="24" />
        Cart
      </NuxtLink>
    </div>
  </header>
</template>
