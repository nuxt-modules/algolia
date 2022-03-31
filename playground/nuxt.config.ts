import { defineNuxtConfig } from 'nuxt3'
import AlgoliaModule from '..'

export default defineNuxtConfig({
  modules: [
    AlgoliaModule
  ],
  algolia: {
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY ?? 'apiKey',
    applicationId: process.env.ALGOLIA_APPLICATION_ID ?? 'applicationId',
    lite: false, // by default set to 'true',
    docSearch: true,
    instantSearch: {
      theme: 'algolia'
    },
    recommend: true
  }
})
