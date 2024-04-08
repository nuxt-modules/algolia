/* eslint-disable no-redeclare */
import type { RequestOptionsObject, SearchResponse } from '../../types'
import { useAlgoliaInitIndex } from './useAlgoliaInitIndex'
import { useNuxtApp, useAsyncData, useRuntimeConfig } from '#imports'
import type { AsyncData } from '#app';

export type AsyncSearchParams = { query: string, indexName?: string, key?: string } & RequestOptionsObject;

export async function useAsyncAlgoliaSearch ({ query, requestOptions, indexName, key }: AsyncSearchParams): Promise<AsyncData<SearchResponse<unknown>, Error>> {
  const config = useRuntimeConfig()
  const index = indexName || config.public.algolia.globalIndex

  if (!index) throw new Error('`[@nuxtjs/algolia]` Cannot search in Algolia without `indexName`')

  const algoliaIndex = useAlgoliaInitIndex(index)

  const result = await useAsyncData(`${index}-async-search-result-${key ?? ''}`, async () => {
    if (import.meta.server) {
      const nuxtApp = useNuxtApp()
      if (config.public.algolia.useFetch) {
        nuxtApp.$algolia.transporter.requester = (await import('@algolia/requester-fetch').then((lib) => lib.default || lib)).createFetchRequester();
      } else {
        nuxtApp.$algolia.transporter.requester = (await import('@algolia/requester-node-http').then(lib => lib.default || lib)).createNodeHttpRequester()
      }
    }
    return await algoliaIndex.search(query, requestOptions)
  })

  return result
}
