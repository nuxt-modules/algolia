import { defineNuxtConfig } from 'nuxt3'
import AlgoliaModule from '..'

export default defineNuxtConfig({
  modules: [
    AlgoliaModule
  ],
  algolia: {
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    lite: false // by default set to 'true'
  }
})
