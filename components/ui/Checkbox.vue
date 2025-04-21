<script setup>
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";
</script>

<template>
  <CheckboxRoot class="border-2 h-6 w-6 rounded-lg border-ecommerce-green">
    <CheckboxIndicator
      class="bg-ecommerce-sage h-full w-full flex items-center justify-center rounded-lg text-ecommerce-green"
    >
      <Icon name="radix-icons:check" width="32" height="32" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
