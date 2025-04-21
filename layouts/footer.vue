<script setup lang="ts">
import Separator from "~/components/ui/Separator.vue";
import { PRIVACY_TERMS, CONTACT_US } from "@/utils/paths";
</script>

<template>
  <footer class="p-10 bg-ecommerce-sage">
    <div class="flex items-center gap-8">
      <h2 class="text-ecommerce-green font-bold">Logo</h2>
      <h2 class="font-bold text-2xl">Ecommerce</h2>
      <p>|</p>
      <p class="flex items-center gap-1">
        <Icon name="lucide:phone" width="24" height="24" />
        xxxx xxx xxxx
      </p>
      <p class="flex items-center gap-1">
        <Icon name="lucide:mail" width="24" height="24" />
        contact@email.com
      </p>
    </div>
    <Separator />

    <div class="flex justify-between">
      <RouterLink :to="CONTACT_US"> Contact us </RouterLink>
      <RouterLink :to="PRIVACY_TERMS"> Privacy terms </RouterLink>
    </div>
  </footer>
</template>
