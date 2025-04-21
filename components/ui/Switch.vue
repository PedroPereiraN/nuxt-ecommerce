<script setup>
import { SwitchRoot, SwitchThumb } from "reka-ui";
</script>

<template>
  <SwitchRoot
    class="w-[42px] h-[25px] flex items-center bg-gray-600 data-[state=checked]:bg-ecommerce-green cursor-pointer transition-all rounded-full relative"
  >
    <SwitchThumb
      class="block w-[21px] h-[21px] bg-white shadow-md rounded-full transition-transform duration-200 ease-in-out transform translate-x-[2px] data-[state=checked]:translate-x-[19px]"
    />
  </SwitchRoot>
</template>
