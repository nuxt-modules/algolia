import { computed } from 'vue'
import { SearchParams, SearchResponse } from '../types'
import { useInitIndex } from './useInitIndex'
import { useState } from '#app'

export const useSearch = (indexName: string) => {
  const algoliaIndex = useInitIndex(indexName)
  const result = useState<SearchResponse<unknown>>(`${indexName}-search-result`, () => null as any)

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
