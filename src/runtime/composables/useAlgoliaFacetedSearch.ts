/* eslint-disable no-redeclare */
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { AlgoliaIndices, RequestOptionsObject, SearchForFacetValuesResponse } from '../../types'
import { useAlgoliaInitIndex } from './useAlgoliaInitIndex'
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

export function useAlgoliaFacetedSearch<K extends keyof AlgoliaIndices>(indexName: K): UseSearchForFacetValuesReturnType
export function useAlgoliaFacetedSearch(indexName: string): UseSearchForFacetValuesReturnType
export function useAlgoliaFacetedSearch (indexName: string) {
  const algoliaIndex = useAlgoliaInitIndex(indexName)
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
