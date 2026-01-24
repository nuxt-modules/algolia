import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineNuxtModule, addPlugin, addComponentsDir, addServerHandler, addImportsDir, useLogger } from '@nuxt/kit'
import { defu } from 'defu'
import { createPageGenerateHook, createGenerateDoneHook } from './hooks'
import type { CrawlerPage, CrawlerOptions } from './hooks'
import { InstantSearchThemes, type ModuleBaseOptions } from './types'
import { resolveModulePath } from 'exsolve'

const MODULE_NAME = '@nuxtjs/algolia'
const logger = useLogger(MODULE_NAME)

function throwError(message: string) {
  throw new Error(`\`[${MODULE_NAME}]\` ${message}`)
}

export interface ModuleOptions extends ModuleBaseOptions {
  crawler?: CrawlerOptions
};

export * from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/algolia',
    configKey: 'algolia',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  defaults: {
    applicationId: process.env.ALGOLIA_APPLICATION_ID || '',
    apiKey: process.env.ALGOLIA_API_KEY || '',
    globalIndex: '',
    lite: true,
    cache: false,
    instantSearch: false,
    docSearch: {},
    useFetch: false,
    crawler: {
      apiKey: '',
      indexName: '',
      include: () => true,
      meta: ['title', 'description'],
    },
  },
  setup(options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    const wrapperPath = fileURLToPath(new URL('./runtime/requester-node-http-wrapper.ts', import.meta.url))
    nuxt.options.build.transpile.push(
      runtimeDir,
      '@algolia/cache-in-memory',
      '@algolia/cache-common',
      '@algolia/client-common',
      '@algolia/client-search',
      '@algolia/recommend',
      '@algolia/requester-browser-xhr',
      '@algolia/requester-fetch',
      '@algolia/requester-node-http',
      'algoliasearch',
    )

    // Ensure the wrapper is transpiled
    nuxt.options.build.transpile.push(
      resolve(runtimeDir, 'requester-node-http-wrapper'),
    )

    const notRunningInPrepareScript = !nuxt.options._prepare

    if (notRunningInPrepareScript && (!options.apiKey || !options.applicationId)) {
      console.warn('Missing `apiKey` or `applicationId` in `nuxt.config.js`')
      return
    }

    if (options.crawler!.apiKey || options.crawler!.indexName) {
      if (!options.crawler!.apiKey && notRunningInPrepareScript) {
        throwError('Missing `crawler.apiKey`')
      }

      if (!options.crawler!.indexName && notRunningInPrepareScript) {
        throwError('Missing `crawler.indexName`')
      }

      const pages: CrawlerPage[] = []

      const pageGenerator = createPageGenerateHook(nuxt, options, pages)
      const doneGenerator = createGenerateDoneHook(nuxt, options, pages)

      nuxt.hooks.hookOnce('nitro:init', (nitro) => {
        nitro.hooks.hookOnce('prerender:routes', () => {
          nitro.hooks.hook('prerender:route', async ({ route, contents }) => {
            await pageGenerator(contents, route)
          })
          nitro.hooks.hookOnce('close', async () => {
            await doneGenerator()
          })
        })
      })
    }

    if (Object.keys(options.docSearch!).length) {
      addComponentsDir({
        path: resolve(runtimeDir, 'components'),
        pathPrefix: false,
        prefix: '',
        global: true,
      })
    }

    // Assign runtime config directly
    // Note: We merge manually to avoid TypeScript type conflicts with defu
    const existingAlgoliaConfig = nuxt.options.runtimeConfig.public?.algolia

    // Create config object with correct types matching ModuleBaseOptions
    const algoliaConfig: ModuleBaseOptions = {
      apiKey: options.apiKey,
      applicationId: options.applicationId,
      globalIndex: options.globalIndex ?? existingAlgoliaConfig?.globalIndex ?? '',
      lite: options.lite ?? existingAlgoliaConfig?.lite ?? true,
      cache: options.cache ?? existingAlgoliaConfig?.cache ?? false,
      instantSearch: options.instantSearch ?? existingAlgoliaConfig?.instantSearch ?? false,
      docSearch: options.docSearch ?? existingAlgoliaConfig?.docSearch ?? {},
      recommend: options.recommend ?? existingAlgoliaConfig?.recommend ?? false,
      useFetch: options.useFetch ?? existingAlgoliaConfig?.useFetch ?? false,
    }

    // Assign with type assertion to PublicRuntimeConfig type
    // The addTypeTemplate above ensures the types are compatible
    nuxt.options.runtimeConfig.public.algolia = algoliaConfig as typeof nuxt.options.runtimeConfig.public.algolia

    if (options.instantSearch) {
      nuxt.options.build.transpile.push('vue-instantsearch/vue3')

      if (typeof options.instantSearch === 'object') {
        const { theme } = options.instantSearch
        if (theme) {
          if (theme in InstantSearchThemes) {
            nuxt.options.css.push(`instantsearch.css/themes/${theme}.css`)
          }
          else {
            logger.error('Invalid theme:', theme)
          }
        }
      }
    }

    // Polyfilling server packages for SSR support
    nuxt.hook('vite:extendConfig', (config, { isClient }) => {
      if (isClient) {
        // On client, mock node-http requester
        config.resolve.alias['@algolia/requester-node-http'] = resolveModulePath('mocked-exports/empty', { from: import.meta.url })
      }
      else {
        // On server, use fetch requester wrapper instead of node-http
        // wrapperPath is calculated before the hook to avoid issues with fileURLToPath in Vite context
        config.resolve.alias['@algolia/requester-node-http'] = wrapperPath
      }
    })

    addPlugin(resolve(runtimeDir, 'plugin'))
    addImportsDir(resolve(runtimeDir, 'composables'))

    if (options?.indexer && Object.keys(options?.indexer).length) {
      const cmsProvider = Object.keys(options.indexer)[0]

      nuxt.options.runtimeConfig.algoliaIndexer = defu(nuxt.options.runtimeConfig.algoliaIndexer, {
        [cmsProvider]: options.indexer[cmsProvider],
      })

      addServerHandler({
        route: '/api/indexer',
        handler: resolve(runtimeDir, `server/api/${cmsProvider}`),
      })
    }
  },
})
