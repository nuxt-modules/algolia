import { useNuxtApp } from '#imports'

export const useAlgoliaRef = () => {
  const nuxtApp = useNuxtApp()
  const algolia = nuxtApp.$algolia

  return algolia
}
