import type { RecommendationsRequest, RecommendClient } from '@algolia/recommend'
import { type ComputedRef, computed } from 'vue'
import type { RequestOptionsObject } from '../../types'
import { useNuxtApp, useState } from '#imports'

export type RecommendParams = { requests: RecommendationsRequest[] } & RequestOptionsObject

export type RecommendResponse = Awaited<ReturnType<RecommendClient['getRecommendations']>>

export type UseAlgoliaRecommend = {
  result: ComputedRef<RecommendResponse | null>;
  get: (params: RecommendParams) => Promise<RecommendResponse>
}

export function useAlgoliaRecommend (key: string = ''): UseAlgoliaRecommend {
  const { $algoliaRecommend } = useNuxtApp()
  const algoliaRecommend: RecommendClient = $algoliaRecommend

  if (!$algoliaRecommend) {
    throw new Error('`[@nuxtjs/algolia]` Cannot call useAlgoliaRecommend composable due to missing `algolia.recommend` option.')
  }

  const result = useState(`recommend-result${key ? '-' + key : ''}`, () => null)

  const get = async ({ requests, requestOptions }: RecommendParams) => {
    result.value = await algoliaRecommend.getRecommendations({
      requests
    }, requestOptions)

    return result.value
  }

  return {
    result: computed(() => result.value),
    get
  }
}
