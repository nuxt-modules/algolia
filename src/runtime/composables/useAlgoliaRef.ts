import type { SearchClient } from 'algoliasearch/lite'
import { useNuxtApp } from '#imports'

export const useAlgoliaRef = (): SearchClient => {
  const nuxtApp = useNuxtApp()
  const algolia: SearchClient = nuxtApp.$algolia

  return algolia
}
