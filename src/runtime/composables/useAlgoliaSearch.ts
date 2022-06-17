/* eslint-disable no-redeclare */
import { computed } from 'vue'
import type { SearchResponse } from '@algolia/client-search'
import type { ComputedRef } from 'vue'
import type { AlgoliaIndices, RequestOptionsObject } from '../../types'
import { useInitIndex } from './useInitIndex'
import { useState } from '#imports'

export type SearchParams = { query: string } & RequestOptionsObject;

export type UseSearchReturnType<T> = {
  result: ComputedRef<SearchResponse<T>>,
  search: (params: SearchParams) => Promise<SearchResponse<T>>,
}

export function useAlgoliaSearch<K extends keyof AlgoliaIndices>(indexName: K): UseSearchReturnType<AlgoliaIndices[K]>
export function useAlgoliaSearch<T>(indexName: string): UseSearchReturnType<T>
export function useAlgoliaSearch (indexName: string) {
  const algoliaIndex = useInitIndex(indexName)
  const result = useState(`${indexName}-search-result`, () => null)

  const search = async ({ query, requestOptions }: SearchParams) => {
    const searchResult = await algoliaIndex.search(query, requestOptions)
    result.value = searchResult
    return searchResult
  }

  return {
    result: computed(() => result.value),
    search
  }
}
