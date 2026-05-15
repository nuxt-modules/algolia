import { createInMemoryCache } from '@algolia/cache-in-memory'
import { createFetchRequester } from '@algolia/requester-fetch'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { applicationId, apiKey, lite, recommend, cache } = useRuntimeConfig().public.algolia

  const algoliasearch = lite
    ? await import('algoliasearch/lite').then(lib => lib.liteClient)
    : await import('algoliasearch').then(lib => lib.searchClient)

  const algoliaSearchClient = cache ? algoliasearch(applicationId, apiKey, { responsesCache: createInMemoryCache(), requestsCache: createInMemoryCache({ serializable: false }), requester: createFetchRequester() }) : algoliasearch(applicationId, apiKey, { requester: createFetchRequester() })

  nuxtApp.provide('algolia', algoliaSearchClient)

  if (recommend) {
    const algoliaRecommend = await import('@algolia/recommend')
    nuxtApp.provide('algoliaRecommend', algoliaRecommend.recommendClient(applicationId, apiKey))
  }
})
