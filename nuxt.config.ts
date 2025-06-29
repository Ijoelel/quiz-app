import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  ssr: false,
  css: ["./assets/css/tailwind.css"],

  vite: {
      plugins: [tailwindcss()],
  },

  modules: ["@pinia/nuxt"],
});