import type { RecommendationsQuery, RecommendClient } from '@algolia/recommend'
import { type ComputedRef, computed } from 'vue'
import type { RequestOptionsObject, SearchResponse } from '../../types'
import { useNuxtApp, useState } from '#imports'

export type RecommendParams = { queries: RecommendationsQuery[] } & RequestOptionsObject

export type MultipleQueriesResponse<T> = {
  results: Array<SearchResponse<T>>;
}

export type UseAlgoliaRecommend<T> = {
  result: ComputedRef<MultipleQueriesResponse<T>>;
  get: (params: RecommendParams) => Promise<MultipleQueriesResponse<T>>
}

export function useAlgoliaRecommend<T> (key: string = ''): UseAlgoliaRecommend<T> {
  const { $algoliaRecommend } = useNuxtApp()
  const algoliaRecommend: RecommendClient = $algoliaRecommend

  if (!$algoliaRecommend) {
    throw new Error('`[@nuxtjs/algolia]` Cannot call useAlgoliaRecommend composable due to missing `algolia.recommend` option.')
  }

  const result = useState(`recommend-result${key ? '-' + key : ''}`, () => null)

  const get = async ({ queries, requestOptions }: RecommendParams) => {
    result.value = await algoliaRecommend.getRecommendations<T>(queries, requestOptions)

    return result.value
  }

  return {
    result: computed(() => result.value),
    get
  }
}
