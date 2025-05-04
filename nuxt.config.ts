import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "reka-ui/nuxt",
    "@vee-validate/nuxt",
    "nuxt-zod-i18n",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "vue3-carousel-nuxt",
  ],
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});