import { computed } from 'vue'
import { SearchQuery } from '../types'
import { useAlgolia } from './useAlgolia'
import { useState } from '#app'

export const useSearch = (uniqueIndex: string) => {
  const algolia = useAlgolia()
  const result = useState<any>(`${uniqueIndex}-search-result`, () => null)

  const search = async ({ query }: SearchQuery) => {
    const algoliaIndex = algolia.initIndex(uniqueIndex)
    const searchResult = await algoliaIndex.search(query)
    result.value = searchResult
    return searchResult
  }

  return {
    result: computed(() => result.value),
    search
  }
}
