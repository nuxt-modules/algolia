import { useAlgolia } from './useAlgolia'

export const useInitIndex = (indexName: string) => {
  const algolia = useAlgolia()
  const algoliaIndex = algolia.initIndex(indexName)

  return algoliaIndex
}
