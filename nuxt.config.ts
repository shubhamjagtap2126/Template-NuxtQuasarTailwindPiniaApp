// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: "%s | My App", // %s is replaced with the page title
    },
  },
  css: ["./assets/main.css", "./assets/quasar-variables.sass", "quasar/fonts", "quasar/animations", "quasar/icons", "quasar/css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-quasar-ui"],
  quasar: {
    plugins: ["BottomSheet", "Dialog", "Loading", "LoadingBar", "Notify", "Dark", "LocalStorage"],
    extras: {
      animations: "all",
      font: "roboto-font",
    },
  },
});
