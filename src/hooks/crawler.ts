
import type { Nuxt } from '@nuxt/schema'
import algoliasearch from 'algoliasearch'
import type { SearchClient, SearchIndex } from 'algoliasearch'
import metascraper, { Metadata } from 'metascraper'
import type { AlgoliaOptions, CrawlerPage, GeneratePageArg } from 'src/types'

/**
 * Create a function to specify which routes should be indexed.
 */
function createShouldInclude (options: AlgoliaOptions) {
  const { include } = options.crawler

  return typeof include === 'function'
    ? include
    : (route: string) => include.some(pattern => route.match(pattern))
}

/**
 * Create a function to collect the routes' metadata.
 */
function createMetaGetter (options: AlgoliaOptions) {
  const { meta } = options.crawler

  if (typeof meta === 'function') {
    return meta
  }

  const defaultMetaGetter = createDefaultMetaGetter()

  if (Array.isArray(meta)) {
    return async (html: string, route: string) => {
      const metadata = await defaultMetaGetter(html, route)

      return meta.reduce((acc, key) => ({ ...acc, [key]: metadata[key] }), {} as Metadata)
    }
  }

  return defaultMetaGetter
}

/**
 * Default metadata getter using "metascaper".
 */
function createDefaultMetaGetter () {
  const scraper = metascraper([])

  return async (html: string, route: string) => {
    return await scraper({ html, url: route })
  }
}

/**
 * Create the "page:generate" hook callback to collect all the included routes' metadata.
 */
export function createPageGenerateHook (nuxt: Nuxt, options: AlgoliaOptions, pages: CrawlerPage[]) {
  const shouldInclude = createShouldInclude(options)
  const getMeta = createMetaGetter(options)

  return async ({ html, route }: GeneratePageArg) => {
    if (shouldInclude(route)) {
      const meta = await getMeta(html, route)
      const page = { href: route, ...meta }

      await nuxt.callHook('crawler:add:before', {
        route,
        html,
        meta,
        page
      })

      pages.push(page)

      await nuxt.callHook('crawler:add:after', {
        route,
        html,
        meta,
        page
      })
    }
  }
}

/**
   * Create the "generate:done" hook callback to index the collected routes' metadata.
   */
export function createGenerateDoneHook (nuxt: Nuxt, options: AlgoliaOptions, pages: CrawlerPage[]) {
  return async () => {
    if (pages.length > 0 && options.crawler) {
      const { crawler: { apiKey, indexName }, applicationId } = options
      const client = algoliasearch(applicationId, apiKey)
      const index = client.initIndex(indexName)

      await nuxt.callHook('crawler:index:before', {
        options,
        pages,
        client,
        index
      })

      await index.replaceAllObjects(pages, {
        autoGenerateObjectIDIfNotExist: true
      })

      await nuxt.callHook('crawler:index:after', {
        options,
        pages,
        client,
        index
      })
    }
  }
}

  declare module '@nuxt/schema' {
      interface NuxtHooks {
          'crawler:add:before': (arg: { route: string, html: string, meta: Metadata, page: CrawlerPage }) => void
          'crawler:add:after': (arg: { route: string, html: string, meta: Metadata, page: CrawlerPage }) => void
          'crawler:index:before': (arg: { options: AlgoliaOptions, pages: CrawlerPage[], client: SearchClient, index: SearchIndex }) => void
          'crawler:index:after': (arg: { options: AlgoliaOptions, pages: CrawlerPage[], client: SearchClient, index: SearchIndex }) => void
      }
  }
