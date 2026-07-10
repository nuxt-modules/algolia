import { createInMemoryCache } from '@algolia/cache-in-memory'
import { createFetchRequester } from '@algolia/requester-fetch'
import { liteClient } from 'algoliasearch/lite'
import type { RecommendClient, SearchClient } from 'algoliasearch'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(async () => {
  const { applicationId, apiKey, lite, recommend, cache } = useRuntimeConfig().public.algolia

  const algoliaSarchOptions = cache
    ? { responsesCache: createInMemoryCache(), requestsCache: createInMemoryCache({ serializable: false }), requester: createFetchRequester() }
    : { requester: createFetchRequester() }

  const algoliaLiteClient = liteClient(applicationId, apiKey, algoliaSarchOptions)

  let algoliaFullClient: SearchClient | undefined
  if (!lite) {
    algoliaFullClient = await import('algoliasearch/dist/browser').then(lib => lib.algoliasearch(applicationId, apiKey, algoliaSarchOptions))
  }

  let algoliaRecommend: RecommendClient | undefined
  if (recommend) {
    const algoliaRecommendClient = await import('@algolia/recommend')
    algoliaRecommend = algoliaRecommendClient.recommendClient(applicationId, apiKey)
  }

  return {
    provide: {
      algolia: algoliaLiteClient,
      algoliaFullClient,
      algoliaRecommend
    }
  }
})
