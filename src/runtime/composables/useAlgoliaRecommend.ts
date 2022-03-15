import { useNuxtApp, useState } from '#app'
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
  const nuxtApp = useNuxtApp()
  const algoliaRecommend: RecommendClient = nuxtApp.$algoliaRecommend
  const result = useState('recommend-result', () => null)

  const get = async ({ queries, requestOptions }: RecommendParams) => {
    const getRecommendationResult = await algoliaRecommend.getRecommendations<T>(queries, requestOptions)
    result.value = getRecommendationResult
    return getRecommendationResult
  }

  return {
    result: computed(() => result.value),
    get
  }
}
