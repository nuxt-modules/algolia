/* eslint-disable no-redeclare */
import { computed } from 'vue'
import type { RequestOptions } from '@algolia/transporter'
import type { SearchOptions, SearchResponse } from '@algolia/client-search'
import type { ComputedRef } from 'vue'
import type { AlgoliaIndices } from '../../types'
import { useInitIndex } from './useInitIndex'
import { useState } from '#app'

export type SearchParams = {
  query: string;
  requestOptions?: RequestOptions & SearchOptions;
  [key: string]: any;
};

export type SearchForFacetValuesParams = {
  facet: {
    name: string;
    query: string;
  };
  requestOptions?: RequestOptions & SearchOptions;
  [key: string]: any;
}

export type UseSearchReturnType<T> = {
  result: ComputedRef<SearchResponse<T>>,
  search: (params: SearchParams) => Promise<SearchResponse<T>>,
}

export function useSearch<K extends keyof AlgoliaIndices>(indexName: K): UseSearchReturnType<AlgoliaIndices[K]>
export function useSearch<T>(indexName: string): UseSearchReturnType<T>
export function useSearch (indexName: string) {
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
