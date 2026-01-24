import type { SearchClient, SearchResponse } from 'algoliasearch'
import type { LiteClient } from 'algoliasearch/lite'
import { useNuxtApp } from '#imports'

// Helper type that adds searchSingleIndex method to both SearchClient and LiteClient
type AlgoliaClientWithSingleIndex = (SearchClient | LiteClient) & {
  searchSingleIndex<T = Record<string, unknown>>(params: {
    indexName: string
    searchParams: {
      query: string
      [key: string]: unknown
    }
  }): Promise<SearchResponse<T>>
}

export const useAlgoliaRef = (): AlgoliaClientWithSingleIndex => {
  const nuxtApp = useNuxtApp()
  const algolia = nuxtApp.$algolia as SearchClient | LiteClient

  // Add searchSingleIndex helper method that uses searchForHits internally
  // SearchMethodParams has structure: { requests: Array<{ indexName: string, ...searchParams }> }
  return {
    ...algolia,
    searchSingleIndex<T = Record<string, unknown>>(params: {
      indexName: string
      searchParams: {
        query: string
        [key: string]: unknown
      }
    }): Promise<SearchResponse<T>> {
      return algolia.searchForHits<T>({
        requests: [{
          indexName: params.indexName,
          ...params.searchParams,
        }],
      }).then(result => result.results[0] as SearchResponse<T>)
    },
  } as AlgoliaClientWithSingleIndex
}
