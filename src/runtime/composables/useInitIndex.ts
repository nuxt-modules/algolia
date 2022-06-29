/* eslint-disable no-redeclare */
import type { SearchIndex } from 'algoliasearch'
import type { AlgoliaIndices, TypedSearchIndex } from './../../types'
import { useAlgolia } from './useAlgolia'

export function useInitIndex<T extends keyof AlgoliaIndices>(indexName: T): TypedSearchIndex<T>
export function useInitIndex<T extends string>(indexName: T): SearchIndex
export function useInitIndex (indexName: string) {
  console.warn('`[@nuxtjs/algolia]` This composable was deprecated and will be removed with the next major release. Please use `useAlgoliaInitIndex` instead.')

  const algolia = useAlgolia()

  const algoliaIndex = algolia?.initIndex(indexName)

  return algoliaIndex
}
