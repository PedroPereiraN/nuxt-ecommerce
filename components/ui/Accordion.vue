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
  <AccordionRoot class="rounded-lg" type="single" :collapsible="true">
    <template v-for="item in props.items" :key="item.value">
      <AccordionItem
        :value="item.value"
        class="hover:brightness-90 mx-2 my-4 w-11/12 active:brightness-90 ease-in duration-150"
      >
        <AccordionHeader>
          <AccordionTrigger
            class="text-center w-full data-[state=closed]:rounded-lg data-[state=open]:rounded-t-lg py-2 px-6 bg-ecommerce-sage text-lg flex items-center justify-between cursor-pointer group"
          >
            <div class="flex items-center gap-1">
              <Icon v-if="item?.icon" :name="item.icon" />
              <p>{{ item.title }}</p>
            </div>
            <Icon
              name="lucide:chevron-down"
              class="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=closed]:-rotate-90"
            />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent
          class="py-2 px-8 bg-white w-full rounded-b-lg hover:brightness-90 ease-in duration-150 active:brightness-90"
        >
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
