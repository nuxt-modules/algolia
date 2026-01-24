/* eslint-disable no-redeclare */
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { AlgoliaIndices, RequestOptionsObject, SearchForFacetValuesResponse } from '../../types'
import { useNuxtApp, useState, useRuntimeConfig } from '#imports'

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

export function useAlgoliaFacetedSearch<K extends keyof AlgoliaIndices>(indexName?: K): UseSearchForFacetValuesReturnType
export function useAlgoliaFacetedSearch(indexName?: string): UseSearchForFacetValuesReturnType
export function useAlgoliaFacetedSearch (indexName?: string) {
  const config = useRuntimeConfig()
  const index = indexName || config.public.algolia.globalIndex

  if (!index) { 
    throw new Error('`[@nuxtjs/algolia]` Cannot search for facet values without `globalIndex` or `indexName` passed as a parameter') 
  }

  const nuxtApp = useNuxtApp()
  const algolia = nuxtApp.$algolia as any
  const result = useState(`${index}-search-for-facet-values-result`, () => null)

  const search = async ({ facet, requestOptions }: SearchForFacetValuesParams) => {
    const { name, query } = facet
    
    // Check if searchForFacetValues exists on the client
    if (typeof algolia?.searchForFacetValues === 'function') {
      // In Algolia v5, searchForFacetValues signature is:
      // searchForFacetValues({ indexName, facetName, searchForFacetValuesRequest }, requestOptions?)
      const searchForFacetValuesResult = await algolia.searchForFacetValues({
        indexName: index,
        facetName: name,
        searchForFacetValuesRequest: {
          facetQuery: query,
          ...requestOptions
        }
      }, requestOptions?.requestOptions)
      
      result.value = searchForFacetValuesResult
      return searchForFacetValuesResult
    }
    
    // If method doesn't exist, throw a helpful error
    throw new Error('searchForFacetValues is not available. Make sure you are using the full SearchClient (set lite: false in your nuxt.config.ts), not LiteClient.')
  }

  return {
    result: computed(() => result.value),
    search
  }
}
