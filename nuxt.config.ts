// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // '@nuxt/eslint',
  modules: ['@nuxtjs/tailwindcss', 'nuxt-quasar-ui', '@pinia/nuxt', 'pinia-plugin-persistedstate', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/scripts', '@vite-pwa/nuxt'],
  imports: {
    dirs: ['./client/plugins/**', './client/composables/**'],
  },
  devtools: { enabled: true },
  devServer: { port: 3100 },
  app: {
    head: {
      titleTemplate: '%s | AppName',
      meta: [],
      link: [
        { rel: 'manifest', href: 'manifest.json' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      // script: [{ src: 'https://www.googletagmanager.com/ns.html?id=GTM-WFHNVRQP' }],
      // link: [{ rel: 'manifest', href: 'manifest.json' }],
      viewport: 'width=device-width, initial-scale=1 maximum-scale=1, user-scalable=no',
    },
  },
  css: ['./client/assets/main.css', 'quasar/animations', 'quasar/icons'],
  runtimeConfig: {
    public: { SECURELS_SECRET: process.env.SECURELS_SECRET },
    server: { SCRIPT_PROD_URL: process.env.SCRIPT_PROD_URL },
  },
  srcDir: 'client/',
  compatibilityDate: '2025-05-15',
  nitro: {
    preset: 'netlify', // Use 'node-server'' for Node.js server, 'netlify' for Netlify functions, or 'vercel' for Vercel serverless functions
    minify: true, // Minify server-side output
  },
  fonts: {
    google: {
      families: ['Baloo 2', 'fredoka', 'Balsamiq Sans'],
    },
  },
  // eslint: {
  //   config: {
  //     stylistic: { semi: true, quotes: 'double' },
  //     // rules: { 'vue/component-tags-order': ['error', { order: [['script', 'script[setup]'], 'template', 'style'] }] },
  //   },
  // },
  image: {
    domains: ['drive.google.com', 'lh3.googleusercontent.com', 'cdn.quasar.dev', 'images.unsplash.com', 'i.pravatar.cc'], // Allowed image domains
  },
  pinia: {
    storesDirs: ['./client/stores/**'],
    autoImport: ['defineStore'],
  },
  quasar: {
    plugins: ['BottomSheet', 'Dialog', 'Loading', 'LoadingBar', 'Notify', 'Dark', 'LocalStorage', 'AddressbarColor', 'Cookies', 'AppFullscreen'],
    extras: { animations: 'all' },
    config: {
      brand: {
        primary: '#3f4da3',
        secondary: '#03a9f4',
        accent: '#9c27b0',
        positive: '#54a646',
        negative: '#d51d43',
        info: '#2196f3',
        warning: '#fdde3d',
        light: '#ffffff',
        dark: '#1d1d1d',
      },
    },
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'petopia-blue': '#1a2b7a', // Example primary blue
            'petopia-yellow': '#ffc107',
          },
          fontFamily: {},
        },
      },
    },
  },
  pwa: {
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true, // ENSURE THIS IS TRUE!
    },
  },
});
