<script setup lang="ts">
const variants = {
  default: "bg-ecommerce-green text-white",
  secondary: "bg-ecommerce-blue text-white",
  outline:
    "bg-transparent text-ecommerce-green border-2 border-ecommerce-green",
  darker: "bg-ecommerce-black text-white",
  danger: "bg-ecommerce-red text-white",
};

export type Props = {
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "darker"
    | "danger"
    | undefined;
  type?: "button" | "submit" | undefined;
  disabled?: boolean;
};

const props = defineProps<Props>();
</script>

<template>
  <button
    :class="`h-14 p-4 flex items-center justify-center rounded-md font-bold ${props.variant ? variants[props.variant] : variants.default}`"
    :type="props.type ?? 'button'"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>
