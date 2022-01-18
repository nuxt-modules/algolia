import { defineNuxtPlugin, NuxtApp } from '#app'

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
  const { applicationId, apiKey, lite } = nuxtApp.payload.config.algolia
  // Have to import algoliasearch directly from esm.browser because algoliasearch by default provides umd.js file which causes Nuxt to throw error
  // Also, cannot use simple string interpolation due to error 'Cannot read property 'stubModule' of undefined'
  const algoliasearch = lite ? await import('algoliasearch/dist/algoliasearch-lite.esm.browser').then(lib => lib.default || lib) : await import('algoliasearch/dist/algoliasearch.esm.browser').then(lib => lib.default || lib)
  const algoliaSearchClient = algoliasearch(applicationId, apiKey)

  nuxtApp.provide('algolia', algoliaSearchClient)
})
