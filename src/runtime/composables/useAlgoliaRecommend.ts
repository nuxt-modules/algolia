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
  const nuxtApp = useNuxtApp()
  const { algolia } = useRuntimeConfig()
  const isRecommendEnabled = algolia.recommend
  if (!isRecommendEnabled) {
    console.error('`[@nuxtjs/algolia]` Cannot call useAlgoliaRecommend composable due to missing `algolia.recommend` option')
  }
  const algoliaRecommend: RecommendClient = nuxtApp.$algoliaRecommend
  const result = useState('recommend-result', () => null)

  const get = async ({ queries, requestOptions }: RecommendParams) => {
    if (!isRecommendEnabled) throw new Error('`[@nuxtjs/algolia]` Cannot call get method from useAlgoliaRecommend composable due to missing `algolia.recommend` option')
    const getRecommendationResult = await algoliaRecommend.getRecommendations<T>(queries, requestOptions)
    result.value = getRecommendationResult
    return getRecommendationResult
  }

  return {
    result: computed(() => result.value),
    get
  }
}
