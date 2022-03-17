import { useNuxtApp, useState, useRuntimeConfig } from '#app'
import { RecommendationsQuery, RecommendClient } from '@algolia/recommend'
import { ComputedRef } from 'vue'
import { RequestOptionsObject, SearchResponse } from '../../types'

export type RecommendParams = { queries: RecommendationsQuery[] } & RequestOptionsObject

export type MultipleQueriesResponse<T> = {
  results: Array<SearchResponse<T>>;
}

export type UseAlgoliaRecommend<T> = {
  result: ComputedRef<MultipleQueriesResponse<T>>;
  get: (params: RecommendParams) => Promise<MultipleQueriesResponse<T>>
}

export function useAlgoliaRecommend<T>(): UseAlgoliaRecommend<T> {
  const { $algoliaRecommend } = useNuxtApp()
  
  if (!$algoliaRecommend) {
    throw new Error('`[@nuxtjs/algolia]` Cannot call useAlgoliaRecommend composable due to missing `algolia.recommend` option.')
  }
  
  const result = useState('recommend-result', () => null)

  const get = async ({ queries, requestOptions }: RecommendParams) => {
    result.value = await algoliaRecommend.getRecommendations<T>(queries, requestOptions)
    
    return result.value
  }

  return {
    result: computed(() => result.value),
    get
  }
}
