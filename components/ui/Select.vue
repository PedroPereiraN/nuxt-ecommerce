<!-- Select.vue -->
<script setup lang="ts">
import {
  SelectContent,
  SelectIcon,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  useForwardPropsEmits,
} from "reka-ui";
import type {
  AcceptableValue,
  SelectRootEmits,
  SelectRootProps,
} from "reka-ui";

export type Props = {
  placeholder?: string;
  placeholderIcon?: string;
} & SelectRootProps;

export type CustomEmits = {
  change: [value: AcceptableValue];
} & SelectRootEmits;

const props = defineProps<Props>();
const emits = defineEmits<CustomEmits>();

const forward = useForwardPropsEmits(props, emits);
</script>

<template>
  <SelectRoot v-bind="forward" class="h-10">
    <SelectTrigger
      class="rounded-lg bg-gray-100 flex justify-between items-center w-full py-2 px-4"
    >
      <SelectValue :placeholder="props.placeholder" />
      <SelectIcon>
        <Icon name="lucide:chevron-down" width="24" height="24" />
      </SelectIcon>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent class="bg-gray-100 rounded-lg">
        <SelectScrollUpButton>
          <Icon name="lucide:chevron-up" width="24" height="24" />
        </SelectScrollUpButton>
        <SelectViewport class="rounded-lg">
          <slot />
        </SelectViewport>
        <SelectScrollDownButton>
          <Icon name="lucide:chevron-down" width="24" height="24" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
