import type { SearchIndex } from 'algoliasearch'
import type { SearchResponse } from '@algolia/client-search'

export interface AlgoliaIndices {}

export type TypedSearchIndex<K extends keyof AlgoliaIndices> = {
    readonly search: (...args: Parameters<SearchIndex['search']>) => Readonly<Promise<SearchResponse<AlgoliaIndices[K]>>>
} & Omit<SearchIndex, 'search'>
