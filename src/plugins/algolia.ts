// Have to import algoliasearch directly from esm.browser because algoliasearch by default provides umd.js file which causes Nuxt to throw error
import algoliasearch from 'algoliasearch/dist/algoliasearch-lite.esm.browser'
import { defineNuxtPlugin, NuxtApp } from '#app'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const { applicationId, apiKey } = nuxtApp.payload.config.algolia
  const algoliaSearch = algoliasearch(applicationId, apiKey)

  nuxtApp.provide('algolia', algoliaSearch)
})
