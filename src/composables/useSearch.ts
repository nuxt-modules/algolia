import { computed } from 'vue'
import type { RequestOptions } from '@algolia/transporter'
import type { SearchOptions, SearchResponse } from '@algolia/client-search'
import { useInitIndex } from './useInitIndex'
import { useState } from '#app'

export type SearchParams = {
  query: string;
  requestOptions?: RequestOptions & SearchOptions;
  [key: string]: any;
};

export type SearchForFacetValuesParams = {
  facet: {
    name: string;
    query: string;
  };
  requestOptions?: RequestOptions & SearchOptions;
  [key: string]: any;
}

export const useSearch = <T>(indexName: string) => {
  const algoliaIndex = useInitIndex(indexName)
  const result = useState<SearchResponse<T>>(`${indexName}-search-result`, () => null as any)

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
