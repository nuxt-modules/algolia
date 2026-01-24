import type { SearchClient } from 'algoliasearch'
import type { LiteClient } from 'algoliasearch/lite'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { createInMemoryCache } from '@algolia/cache-in-memory'
import { createFetchRequester } from '@algolia/requester-fetch'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { applicationId, apiKey, lite, recommend, cache } = useRuntimeConfig().public.algolia

  // In v5 we use the proper entry points and let the client handle requesters automatically
  const { algoliasearch: searchClient } = await import('algoliasearch')
  const { liteClient } = await import('algoliasearch/lite')
  
  // On server, use fetch requester for full client, lite client handles it automatically
  let clientOptions: any = {}
  if (!lite && import.meta.server) {
    // Use fetch requester on server for full SearchClient
    clientOptions.requester = createFetchRequester()
  }
  
  if (cache) {
    clientOptions.responsesCache = createInMemoryCache()
    clientOptions.requestsCache = createInMemoryCache({ serializable: false })
  }
  
  const clientFactory = lite ? liteClient : searchClient

  // Both SearchClient and LiteClient have searchSingleIndex method used by composables
  const algoliaSearchClient: SearchClient | LiteClient = Object.keys(clientOptions).length > 0
    ? clientFactory(applicationId, apiKey, clientOptions)
    : clientFactory(applicationId, apiKey)

  nuxtApp.provide('algolia', algoliaSearchClient)

  if (recommend) {
    const { recommendClient } = await import('@algolia/recommend')
    nuxtApp.provide('algoliaRecommend', recommendClient(applicationId, apiKey))
  }
})
