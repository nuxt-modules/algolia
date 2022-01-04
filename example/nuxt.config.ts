import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  buildModules: [
    ['../src/module', {
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
      applicationId: process.env.ALGOLIA_APPLICATION_ID
    }]
  ]
})
