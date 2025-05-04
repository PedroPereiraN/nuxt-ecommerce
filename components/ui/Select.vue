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
  variant?: "default" | "transparent" | undefined;
} & SelectRootProps;

export type CustomEmits = {
  change: [value: AcceptableValue];
} & SelectRootEmits;

const props = defineProps<Props>();
const emits = defineEmits<CustomEmits>();

const forward = useForwardPropsEmits(props, emits);

const variants = {
  default: "bg-gray-100",
  transparent: "bg-transparent",
};
</script>

<template>
  <SelectRoot v-bind="forward" class="h-10">
    <SelectTrigger
      :class="`flex items-center justify-between rounded-lg w-full py-2 px-4 ${variants[props?.variant ? props.variant : 'default']}  cursor-pointer`"
    >
      <SelectValue :placeholder="props.placeholder" />
      <Icon name="lucide:chevron-down" />
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
