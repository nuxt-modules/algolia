import { SearchClient } from 'algoliasearch/lite'
import { useNuxtApp } from '#imports'

export const useAlgolia = (): SearchClient => {
  const nuxtApp = useNuxtApp()
  const algolia: SearchClient = nuxtApp.$algolia

  return algolia
}
