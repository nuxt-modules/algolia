import { computed } from 'vue'
import { SearchQuery, SearchResponse } from '../types'
import { useState } from '#app'
import { useInitIndex } from './useInitIndex'

export const useSearch = (indexName: string) => {
  const algoliaIndex = useInitIndex(indexName)
  const result = useState<SearchResponse<unknown>>(`${indexName}-search-result`, () => null as any)

  const search = async ({ query, requestOptions }: SearchQuery) => {
    const searchResult = await algoliaIndex.search(query, requestOptions)
    result.value = searchResult
    return searchResult
  }

  return {
    result: computed(() => result.value),
    search
  }
}
