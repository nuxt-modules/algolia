/* eslint-disable no-redeclare */
import type { SearchIndex } from 'algoliasearch'
import type { AlgoliaIndices, TypedSearchIndex } from './../../types'
import { useAlgolia } from './useAlgolia'

export function useInitIndex<T extends keyof AlgoliaIndices>(indexName: T): TypedSearchIndex<T>
export function useInitIndex<T extends string>(indexName: T): SearchIndex
export function useInitIndex (indexName: string) {
  const algolia = useAlgolia()

  const algoliaIndex = algolia?.initIndex(indexName)

  return algoliaIndex
}
