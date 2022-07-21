import { SearchClient } from 'algoliasearch/lite'
import { useNuxtApp } from '#imports'

export const useAlgolia = (): SearchClient => {
  console.warn('`[@nuxtjs/algolia]` This composable was deprecated and will be removed with the next major release. Please use `useAlgoliaRef` instead.')

  const nuxtApp = useNuxtApp()
  const algolia: SearchClient = nuxtApp.$algolia

  return algolia
}
