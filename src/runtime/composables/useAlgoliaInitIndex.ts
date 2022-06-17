/* eslint-disable no-redeclare */
import type { SearchIndex } from 'algoliasearch'
import type { AlgoliaIndices, TypedSearchIndex } from '../../types'
import { useAlgoliaRef } from './useAlgoliaRef'

export function useAlgoliaInitIndex<T extends keyof AlgoliaIndices>(indexName: T): TypedSearchIndex<T>
export function useAlgoliaInitIndex<T extends string>(indexName: T): SearchIndex
export function useAlgoliaInitIndex (indexName: string) {
  const algolia = useAlgoliaRef()

  const algoliaIndex = algolia?.initIndex(indexName)

  return algoliaIndex
}
