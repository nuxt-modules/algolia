/* eslint-disable no-redeclare */
import { computed } from 'vue'
import type { SearchForFacetValuesResponse } from '@algolia/client-search'
import type { ComputedRef } from 'vue'
import type { AlgoliaIndices, RequestOptionsObject } from '../../types'
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

// @ts-expect-error TS can not infer string here
export function useAlgoliaFacetedSearch<K extends keyof AlgoliaIndices>(indexName: K): UseSearchForFacetValuesReturnType
export function useAlgoliaFacetedSearch(indexName: string): UseSearchForFacetValuesReturnType
export function useAlgoliaFacetedSearch (indexName: string) {
  const algolia = useAlgoliaRef()
  const result = useState(`${indexName}-search-for-facet-values-result`, () => null)

  const search = async ({ facet, requestOptions }: SearchForFacetValuesParams) => {
    const { name, query } = facet
    const searchForFacetValuesResult = await algolia.searchForFacets({
      requests: [
        {
          indexName,
          facet: name,
          query,
          type: 'facet'
        }
      ]
    }, requestOptions)
    result.value = searchForFacetValuesResult
    return searchForFacetValuesResult
  }

  return {
    result: computed(() => result.value),
    search
  }
}
