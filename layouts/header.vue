<template>
  <header
    class="flex justify-between px-10 py-2 items-center bg-ecommerce-sage font-medium"
  >
    <div class="flex gap-4 items-center">
      <RouterLink to="/" class="text-ecommerce-green font-bold"
        >Logo</RouterLink
      >
      <p class="flex items-center gap-1">
        Categories
        <Icon name="lucide:chevron-down" width="24" height="24" />
      </p>
    </div>
    <div class="relative w-fit">
      <input
        class="rounded-full h-8 w-96 bg-gray-200 px-4"
        placeholder="Search"
      />
      <Icon
        name="lucide:search"
        width="24"
        height="24"
        class="absolute top-2 right-4"
      />
    </div>
    <div class="flex items-center gap-4">
      <p class="flex items-center gap-1">
        <Icon name="lucide:user" width="24" height="24" />
        User
      </p>
      <p class="flex items-center gap-1">
        <Icon name="lucide:shopping-cart" width="24" height="24" />
        Cart
      </p>
    </div>
  </header>
</template>
