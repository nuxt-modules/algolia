import { defineNuxtPlugin, NuxtApp } from '#app'
import algoliasearch from 'algoliasearch/lite'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const { applicationId, apiKey } = nuxtApp.payload.config.algolia;
  const algoliaSearch = algoliasearch(applicationId, apiKey);

  nuxtApp.provide('algolia', algoliaSearch)
})
