<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from "reka-ui";
import type { AcceptableValue } from "reka-ui";

export type Props = {
  items: {
    value: AcceptableValue;
    id: string;
  }[];
};

const props = defineProps<Props>();
</script>

<template>
  <RadioGroupRoot class="flex flex-col gap-2.5">
    <RadioGroupItem
      v-for="item in props.items"
      :key="item.id"
      :value="item.value"
      :id="item.id"
      class="bg-gray-100 rounded-full w-6 h-6 border border-transparent data-[active=true]:border-ecommerce-green cursor-pointer"
    >
      <RadioGroupIndicator
        class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-white dark:after:bg-ecommerce-green"
      />
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
