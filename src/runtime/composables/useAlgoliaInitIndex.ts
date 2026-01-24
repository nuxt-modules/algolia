// SearchIndex type is not exported from algoliasearch v5, using any for compatibility
import type { AlgoliaIndices, TypedSearchIndex } from '../../types'
import { useAlgoliaRef } from './useAlgoliaRef'

export function useAlgoliaInitIndex<T extends keyof AlgoliaIndices>(indexName: T): TypedSearchIndex<T>
export function useAlgoliaInitIndex<T extends string>(indexName: T): any
export function useAlgoliaInitIndex(indexName: string) {
  const algolia = useAlgoliaRef()

  return {
    search: (query: string, requestOptions: SearchParams) => algolia.searchSingleIndex({
      indexName,
      searchParams: {
        query,
        ...requestOptions,
      },
    }),
  }
}
