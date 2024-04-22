import { defineEventHandler, getQuery } from 'h3'
import StoryblokAlgoliaIndexer from 'storyblok-algolia-indexer'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export default defineEventHandler((event) => {
  const { secret } = getQuery(event)

  if (config.algoliaIndexer.storyblok.secret !== secret) return 'You are not allowed to access this resource'

  new StoryblokAlgoliaIndexer({
    algoliaAppId: config.public.algolia.applicationId,
    algoliaApiAdminToken: config.algoliaIndexer.storyblok.algoliaAdminApiKey,
    algoliaIndexName: config.algoliaIndexer.storyblok.indexName,
    storyblokContentDeliveryApiToken: config.algoliaIndexer.storyblok.accessToken,
  })

  return 'Algolia indexed with the data from Storyblok!'
})
