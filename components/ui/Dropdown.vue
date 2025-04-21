<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "reka-ui";

export type Props = {
  label: string;
  labelIcon: string;
  items: {
    value: string;
    label: string;
  }[];
};

const props = defineProps<Props>();
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger
      class="rounded-lg w-fit p-2 inline-flex items-center justify-center outline-none cursor-pointer flex gap-1"
    >
      <Icon :name="props.labelIcon" width="24" height="24" />
      <p>{{ props.label }}</p>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        class="outline-none bg-gray-100 rounded-lg will-change-[opacity,transform] cursor-pointer"
        :side-offset="2"
      >
        <DropdownMenuItem
          v-for="item in props.items"
          :key="item.value"
          :value="item.value"
          class="groupleading-none py-2 px-4 flex items-center relative select-none outline-none data-[disabled]:text-gray-600 data-[disabled]:cursor-not-allowed data-[highlighted]:bg-gray-200 rounded-lg"
        >
          {{ item.label }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
