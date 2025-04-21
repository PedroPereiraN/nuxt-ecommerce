<script setup lang="ts">
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
} from "reka-ui";

const props = defineProps<SelectItemProps>();
</script>

<template>
  <SelectItem
    v-bind="props"
    class="w-full hover:bg-gray-200 py-2 px-4 flex items-center justify-between"
  >
    <SelectItemText>
      <slot />
    </SelectItemText>
    <SelectItemIndicator>
      <Icon name="lucide:check" width="24" height="24" />
    </SelectItemIndicator>
  </SelectItem>
</template>
