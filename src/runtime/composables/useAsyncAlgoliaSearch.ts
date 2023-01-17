/* eslint-disable no-redeclare */
import type { RequestOptionsObject } from '../../types'
import { useAlgoliaInitIndex } from './useAlgoliaInitIndex'
import { useNuxtApp, useAsyncData, useRuntimeConfig } from '#imports'

export type SearchParams = { query: string, indexName?: string } & RequestOptionsObject;

export async function useAsyncAlgoliaSearch ({ query, requestOptions, indexName }: SearchParams) {
  if (!indexName) throw new Error('`[@nuxtjs/algolia]` Cannot search in Algolia without `indexName` passed as a parameter')

  const config = useRuntimeConfig();
  const index = indexName || config.algolia.globalIndex

  const algoliaIndex = useAlgoliaInitIndex(index)

  const result = await useAsyncData(`${index}-async-search-result`, async () => {
    if (process.server) {
      const nuxtApp = useNuxtApp()
      nuxtApp.$algolia.transporter.requester = (await import('@algolia/requester-node-http').then(lib => lib.default || lib)).createNodeHttpRequester()
    }
    return await algoliaIndex.search(query, requestOptions)
  })

  return result
}
