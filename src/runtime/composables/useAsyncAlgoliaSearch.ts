import type { RequestOptionsObject } from '../../types'
import { useNuxtApp, useAsyncData, useRuntimeConfig } from '#imports'

export type AsyncSearchParams = { query: string, indexName?: string, key?: string } & RequestOptionsObject;

export async function useAsyncAlgoliaSearch <T> ({ query, requestOptions, indexName, key }: AsyncSearchParams) {
  const config = useRuntimeConfig()
  const index = indexName || config.public.algolia.globalIndex

  if (!index) { throw new Error('`[@nuxtjs/algolia]` Cannot search in Algolia without `indexName`') }

  const client = useAlgoliaRef()

  const result = await useAsyncData(`${index}-async-search-result-${key ?? ''}`, async () => {
    if (import.meta.server) {
      const nuxtApp = useNuxtApp()
      nuxtApp.$algolia.transporter.requester = await import('@algolia/requester-fetch').then(lib => lib.createFetchRequester())
    }
    return await client.search<T>({
      requests: [
        {
          indexName: index,
          query
        }
      ]
    }, requestOptions)
  })

  return result
}
