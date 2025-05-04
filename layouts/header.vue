<script setup lang="ts">
import Dropdown from "~/components/ui/Dropdown.vue";
import Select from "~/components/ui/Select.vue";
import SelectItem from "~/components/ui/SelectItem.vue";
import MobileSidebar from "./components/mobile-sidebar.vue";
import { CART } from "@/utils/paths";
import { ref, type Ref } from "vue";

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

const showMobileSidebar: Ref<boolean> = ref(false);
</script>

<template>
  <header
    class="flex justify-between px-10 py-2 items-center bg-ecommerce-sage font-medium"
  >
    <Transition name="mobile-sidebar">
      <MobileSidebar
        class="block md:hidden"
        v-if="showMobileSidebar"
        @close="(b: boolean) => (showMobileSidebar = b)"
      />
    </Transition>
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
    <button
      type="button"
      class="block md:hidden cursor-pointer"
      @click="showMobileSidebar = true"
    >
      <Icon name="lucide:menu" class="text-2xl" />
    </button>
    <div class="hidden md:flex items-center gap-4">
      <Dropdown label="User" labelIcon="lucide:user" :items="userItems" />
      <NuxtLink :to="CART" class="flex items-center gap-1">
        <Icon name="lucide:shopping-cart" width="24" height="24" />
        Cart
      </NuxtLink>
    </div>
  </header>
</template>

<style>
.mobile-sidebar-enter-active {
  transition: all 0.3s ease-out;
}

.mobile-sidebar-leave-active {
  transition: all 0.3s ease-in;
}

.mobile-sidebar-enter-from,
.mobile-sidebar-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
