import { createError, defineEventHandler, getQuery, getRequestHeader, type H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'
import StoryblokAlgoliaIndexer from 'storyblok-algolia-indexer';

const encoder = new TextEncoder()

function isSecretValid (provided: unknown, expected: unknown) {
  if (typeof expected !== 'string' || !expected || typeof provided !== 'string') {
    return false
  }
  const a = encoder.encode(provided)
  const b = encoder.encode(expected)
  let diff = a.length ^ b.length
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i % b.length]
  }
  return diff === 0
}

function getProvidedSecret (event: H3Event) {
  const token = getRequestHeader(event, 'authorization')?.match(/^Bearer\s+(.+)$/i)?.[1]
  return token ?? getQuery(event).secret
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  if (!isSecretValid(getProvidedSecret(event), config.algoliaIndexer?.storyblok?.secret)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  new StoryblokAlgoliaIndexer({
    algoliaAppId: config.public.algolia.applicationId,
    algoliaApiAdminToken: config.algoliaIndexer.storyblok.algoliaAdminApiKey,
    algoliaIndexName: config.algoliaIndexer.storyblok.indexName,
    storyblokContentDeliveryApiToken: config.algoliaIndexer.storyblok.accessToken,
    options: {
      per_page: 100,
      page: 1,
      version: config.algoliaIndexer.storyblok.contentVersion || 'draft',
      ...config.algoliaIndexer.storyblok.options
    }
  })

  return 'Algolia indexed with the data from Storyblok!'
})
