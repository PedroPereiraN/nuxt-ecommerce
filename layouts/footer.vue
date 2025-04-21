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

    <div class="border-b border-ecommerce-black my-6"></div>

    <div class="flex justify-between">
      <RouterLink to="contact-us"> Contact us </RouterLink>
      <RouterLink to="privacy-terms"> Privacy terms </RouterLink>
    </div>
  </footer>
</template>
