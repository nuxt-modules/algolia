import { computed } from 'vue'
import { useInitIndex } from "./useInitIndex"
import { useState } from "#app";
import { SearchForFacetValuesParams, SearchForFacetValuesResponse } from "../types";

export const useSearchForFacetValues = (indexName: string) => {
  const algoliaIndex = useInitIndex(indexName);
  const result = useState<SearchForFacetValuesResponse>(`${indexName}-search-for-facet-values-result`, () => null as any)

  const search = async ({ facet, requestOptions }: SearchForFacetValuesParams) => {
    const { name, query } = facet;
    const searchForFacetValuesResult = await algoliaIndex.searchForFacetValues(name, query, requestOptions)
    result.value = searchForFacetValuesResult
    return searchForFacetValuesResult
  }

  return {
    result: computed(() => result.value),
    search
  }
}
