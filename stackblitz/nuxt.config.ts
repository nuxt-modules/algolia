// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      "@nuxtjs/algolia",
      {
        apiKey: "0fd1c4eba2f831788333e77c9d855f1d",
        applicationId: "AGN9HUEKF3",
      },
    ],
  ],
  compatibilityDate: "2024-04-03",
});
