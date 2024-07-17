/* eslint-disable no-redeclare */
import { computed } from 'vue'
import type { SearchResponse } from '@algolia/client-search'
import type { ComputedRef } from 'vue'
import type { AlgoliaIndices, RequestOptionsObject } from '../../types'
import { useAlgoliaInitIndex } from './useAlgoliaInitIndex'
import { useState, useRuntimeConfig, useNuxtApp } from '#imports'

export type SearchParams = { query: string } & RequestOptionsObject;

export type UseSearchReturnType<T> = {
  result: ComputedRef<SearchResponse<T>>,
  search: (params: SearchParams) => Promise<SearchResponse<T>>,
}

export function useAlgoliaSearch<K extends keyof AlgoliaIndices>(indexName?: K): UseSearchReturnType<AlgoliaIndices[K]>
export function useAlgoliaSearch<T>(indexName?: string): UseSearchReturnType<T>
export function useAlgoliaSearch (indexName?: string) {
  const config = useRuntimeConfig()
  const index = indexName || config.public.algolia.globalIndex

  if (!index) throw new Error('`[@nuxtjs/algolia]` Cannot search in Algolia without `globalIndex` or `indexName` passed as a parameter')

  const algoliaIndex = useAlgoliaInitIndex(index)
  const result = useState(`${index}-search-result`, () => null)

  const search = async ({ query, requestOptions }: SearchParams) => {
    if (import.meta.server) {
      const nuxtApp = useNuxtApp()
      if (config.public.algolia.useFetch) {
        nuxtApp.$algolia.transporter.requester = (await import("@algolia/requester-fetch").then((lib) => lib.default || lib)).createFetchRequester();
      } else {
        nuxtApp.$algolia.transporter.requester = (await import('@algolia/requester-node-http').then(lib => lib.default || lib)).createNodeHttpRequester()
      }
    }

    const searchResult = await algoliaIndex.search(query, requestOptions)
    result.value = searchResult
    return searchResult
  }

  onUnmounted(() => {
    result.value = undefined;
  });

  return {
    result: computed(() => result.value),
    search
  }
}
