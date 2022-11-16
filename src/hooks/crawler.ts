
import type { Nuxt, NuxtHooks } from '@nuxt/schema'
import algoliasearch from 'algoliasearch'
import scraper from 'metadata-scraper'
import type { SearchClient, SearchIndex } from 'algoliasearch'
import type { MetaData } from 'metadata-scraper/lib/types'
import type { ModuleOptions } from './../module'

// TODO: Nuxt 2 only
// export type GeneratePageArg = Parameters<NuxtHooks['generate:page']>[0]
export type GeneratePageArg = any

export type CrawlerPage = { href: string } & MetaData

/**
 * Create a function to specify which routes should be indexed.
 */
function createShouldInclude (options: ModuleOptions) {
  const { include } = options.crawler

  return typeof include === 'function'
    ? include
    : (route: string) => include.some(pattern => route.match(pattern))
}

/**
 * Create a function to collect the routes' metadata.
 */
function createMetaGetter (options: ModuleOptions) {
  const { meta } = options.crawler

  if (typeof meta === 'function') {
    return meta
  }

  const defaultMetaGetter = createDefaultMetaGetter()

  if (Array.isArray(meta)) {
    return async (html: string, route: string) => {
      const metadata = await defaultMetaGetter(html, route)

      return meta.reduce((acc, key) => ({ ...acc, [key]: metadata[key] }), {} as MetaData)
    }
  }

  return defaultMetaGetter
}

/**
 * Default metadata getter using "metascaper".
 */
function createDefaultMetaGetter () {
  return async (html: string, route: string) => {
    return await scraper({
      html,
      url: route
    })
  }
}

/**
 * Create the "page:generate" hook callback to collect all the included routes' metadata.
 */
export function createPageGenerateHook (nuxt, options: ModuleOptions, pages: CrawlerPage[]) {
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
export function createGenerateDoneHook (nuxt, options: ModuleOptions, pages: CrawlerPage[]) {
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

export interface CrawlerHooks {
  'crawler:add:before': (arg: { route: string, html: string, meta: MetaData, page: CrawlerPage }) => void
  'crawler:add:after': (arg: { route: string, html: string, meta: MetaData, page: CrawlerPage }) => void
  'crawler:index:before': (arg: { options: ModuleOptions, pages: CrawlerPage[], client: SearchClient, index: SearchIndex }) => void
  'crawler:index:after': (arg: { options: ModuleOptions, pages: CrawlerPage[], client: SearchClient, index: SearchIndex }) => void
}

declare module '@nuxt/schema' {
  interface NuxtHooks extends CrawlerHooks {}
}
