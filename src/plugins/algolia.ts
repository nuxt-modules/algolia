// Have to import algoliasearch directly from esm.browser because algoliasearch by default provides umd.js file which causes Nuxt to throw error
// import algoliasearch from 'algoliasearch/dist/algoliasearch-lite.esm.browser'
import { defineNuxtPlugin, NuxtApp } from '#app'

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
  const { applicationId, apiKey, lite } = nuxtApp.payload.config.algolia
  const algoliasearch = lite ? await import('algoliasearch/dist/algoliasearch-lite.esm.browser').then(lib => lib.default || lib) : await import('algoliasearch/dist/algoliasearch.esm.browser').then(lib => lib.default || lib)
  const algoliaSearch = algoliasearch(applicationId, apiKey)

  nuxtApp.provide('algolia', algoliaSearch)
})
