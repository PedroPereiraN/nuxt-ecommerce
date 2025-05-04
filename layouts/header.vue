<script setup lang="ts">
import Dropdown from "~/components/ui/Dropdown.vue";
import Select from "~/components/ui/Select.vue";
import SelectItem from "~/components/ui/SelectItem.vue";
import { CART } from "@/utils/paths";

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
</script>

<template>
  <header
    class="flex justify-between px-10 py-2 items-center bg-ecommerce-sage font-medium"
  >
    <div class="flex gap-4 items-center">
      <RouterLink to="/"
        ><img src="@/assets/img/logo.svg" alt="logo" class="w-12"
      /></RouterLink>
      <Select placeholder="Categories" variant="transparent">
        <SelectItem value="1"> opção 1 </SelectItem>
      </Select>
    </div>
    <div class="relative w-fit">
      <input class="rounded-full h-8 w-96 px-4 bg-white" placeholder="Search" />
      <Icon
        name="lucide:search"
        width="24"
        height="24"
        class="absolute top-2 right-4"
      />
    </div>
    <div class="flex items-center gap-4">
      <Dropdown label="User" labelIcon="lucide:user" :items="userItems" />
      <RouterLink :to="CART" class="flex items-center gap-1">
        <Icon name="lucide:shopping-cart" width="24" height="24" />
        Cart
      </RouterLink>
    </div>
  </header>
</template>
