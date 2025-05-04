<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "reka-ui";
import type { AccordionItem as AccordionItemType } from "#imports";

export type Props = {
  items: AccordionItemType[];
};

const props = defineProps<Props>();
</script>

<template>
  <AccordionRoot
    class="bg-transparent rounded-lg"
    type="single"
    :collapsible="true"
  >
    <template v-for="item in props.items" :key="item.value">
      <AccordionItem :value="item.value">
        <AccordionHeader>
          <AccordionTrigger
            class="text-center w-full py-2 px-6 text-lg flex items-center justify-between cursor-pointer border-b"
          >
            <div class="flex items-center gap-1">
              <Icon v-if="item?.icon" :name="item.icon" />
              <p>{{ item.title }}</p>
            </div>
            <Icon name="lucide:chevron-down" />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="py-2 px-8 bg-white">
          <template v-for="(content, i) in item.contents" :key="i">
            <button v-if="content.type == 'button'">
              {{ content.label }}
            </button>
            <NuxtLink v-if="content.type == 'router'" :to="content?.route">
              {{ content.label }}
            </NuxtLink>
          </template>
        </AccordionContent>
      </AccordionItem>
    </template>
  </AccordionRoot>
</template>
