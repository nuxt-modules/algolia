import { computed, onUnmounted } from 'vue'
// import type { SearchResponses } from '@algolia/client-search'
import type { ComputedRef } from 'vue'
import type { BaseSearchParams, SearchResponse, SearchResponses } from 'algoliasearch'
import type { AlgoliaIndices, RequestOptionsObject } from '../../types'
import { useState, useRuntimeConfig, useNuxtApp } from '#imports'

export type SearchParams = BaseSearchParams & RequestOptionsObject;

export type UseSearchReturnType<T> = {
  result: ComputedRef<SearchResponse<T>>,
  search: (params: SearchParams) => Promise<SearchResponse<T>>,
}

export function useAlgoliaSearch<K extends keyof AlgoliaIndices>(indexName?: K): UseSearchReturnType<AlgoliaIndices[K]>
export function useAlgoliaSearch<T>(indexName?: string): UseSearchReturnType<T>
export function useAlgoliaSearch<T> (indexName?: string) {
  const config = useRuntimeConfig()
  const index = indexName || config.public.algolia.globalIndex

  if (!index) { throw new Error('`[@nuxtjs/algolia]` Cannot search in Algolia without `globalIndex` or `indexName` passed as a parameter') }

  const client = useAlgoliaRef()
  const result = useState(`${index}-search-result`, () => null)

  const search = async ({ query, requestOptions, ...searchOptions }: SearchParams) => {
    if (import.meta.server) {
      const nuxtApp = useNuxtApp()
      nuxtApp.$algolia.transporter.requester = (await import('@algolia/requester-fetch').then(lib => lib.createFetchRequester()))
    }

    const searchResults = await client.search<T>({
      requests: [
        {
          indexName: index,
          query,
          ...searchOptions
        }
      ]
    }, requestOptions)
    const searchResult = searchResults.results[0]
    result.value = searchResult
    return searchResult
  }

  onUnmounted(() => {
    result.value = null
  })

  return {
    result: computed(() => result.value),
    search
  }
}
