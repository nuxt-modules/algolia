import algoliasearch from 'algoliasearch/lite'
import { defineNuxtPlugin, NuxtApp } from '#app'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const { applicationId, apiKey } = nuxtApp.payload.config.algolia
  const algoliaSearch = algoliasearch(applicationId, apiKey)

  nuxtApp.provide('algolia', algoliaSearch)
})
