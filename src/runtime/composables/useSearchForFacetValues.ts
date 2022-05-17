/* eslint-disable no-redeclare */
import { computed } from 'vue'
import type { SearchForFacetValuesResponse } from '@algolia/client-search'
import type { ComputedRef } from 'vue'
import { AlgoliaIndices, RequestOptionsObject } from '../../types'
import { useInitIndex } from './useInitIndex'
import { useState } from '#imports'

export type SearchForFacetValuesParams = {
  facet: {
    name: string;
    query: string;
  };
} & RequestOptionsObject

export type UseSearchForFacetValuesReturnType = {
  result: ComputedRef<SearchForFacetValuesResponse>,
  search: (params: SearchForFacetValuesParams) => Promise<SearchForFacetValuesResponse>,
}

export function useSearchForFacetValues<K extends keyof AlgoliaIndices>(indexName: K): UseSearchForFacetValuesReturnType
export function useSearchForFacetValues(indexName: string): UseSearchForFacetValuesReturnType
export function useSearchForFacetValues (indexName: string) {
  const algoliaIndex = useInitIndex(indexName)
  const result = useState(`${indexName}-search-for-facet-values-result`, () => null)

  const search = async ({ facet, requestOptions }: SearchForFacetValuesParams) => {
    const { name, query } = facet
    const searchForFacetValuesResult = await algoliaIndex.searchForFacetValues(name, query, requestOptions)
    result.value = searchForFacetValuesResult
    return searchForFacetValuesResult
  }

  return {
    result: computed(() => result.value),
    search
  }
}
