// SearchIndex type is not exported from algoliasearch v5, using any for compatibility
import { useAlgoliaRef } from './useAlgoliaRef'

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
