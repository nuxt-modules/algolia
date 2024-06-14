import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addComponentsDir, addServerHandler, addImportsDir, useLogger, isNuxt2 } from '@nuxt/kit'
import { defu } from 'defu'
import { createPageGenerateHook, createGenerateDoneHook } from './hooks'
import type { CrawlerPage, CrawlerHooks, CrawlerOptions } from './hooks'
import { InstantSearchThemes, type ModuleBaseOptions } from './types'

const MODULE_NAME = '@nuxtjs/algolia'
const logger = useLogger(MODULE_NAME)

function throwError (message: string) {
  throw new Error(`\`[${MODULE_NAME}]\` ${message}`)
}

export interface ModuleOptions extends ModuleBaseOptions {
  crawler?: CrawlerOptions
};

export interface ModuleHooks extends CrawlerHooks {}

export * from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/algolia',
    configKey: 'algolia',
    compatibility: {
      nuxt: '>=3.0.0-rc.9 || ^2.16.0',
      bridge: true
    }
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
      meta: ['title', 'description']
    }
  },
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    const notRunningInPrepareScript = !nuxt.options._prepare

    if (!options.apiKey && notRunningInPrepareScript) {
      throwError('Missing `apiKey`')
    }

    if (!options.applicationId && notRunningInPrepareScript) {
      throwError('Missing `applicationId`')
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

      if (isNuxt2(nuxt)) {
        nuxt.addHooks({
        // @ts-expect-error Nuxt 2 only hook
          'generate:page': createPageGenerateHook(nuxt, options, pages),
          'generate:done': createGenerateDoneHook(nuxt, options, pages)
        })
      } else {
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
    }

    if (Object.keys(options.docSearch!).length) {
      addComponentsDir({
        path: resolve(runtimeDir, 'components'),
        pathPrefix: false,
        prefix: '',
        // @ts-ignore
        level: 999,
        global: true
      })
    }

    if (isNuxt2() && !nuxt?.options?.runtimeConfig?.public?.algolia) {
      // Nuxt 2
      // @ts-ignore
      nuxt.options.publicRuntimeConfig.algolia = defu(nuxt.options.publicRuntimeConfig.algolia, {
        apiKey: options.apiKey,
        applicationId: options.applicationId,
        lite: options.lite,
        instantSearch: options.instantSearch,
        docSearch: options.docSearch,
        recommend: options.recommend,
        globalIndex: options.globalIndex,
        useFetch: options.useFetch
      })
    }
    // Nuxt 3
    // @ts-expect-error TODO: Workaround for rc.14 only
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    // @ts-ignore
    nuxt.options.runtimeConfig.public.algolia = defu(nuxt.options.runtimeConfig.algolia, {
      apiKey: options.apiKey,
      applicationId: options.applicationId,
      lite: options.lite,
      cache: options.cache,
      instantSearch: options.instantSearch,
      docSearch: options.docSearch,
      recommend: options.recommend,
      globalIndex: options.globalIndex,
      useFetch: options.useFetch
    })

    if (options.instantSearch) {
      nuxt.options.build.transpile.push('vue-instantsearch/vue3')

      if (typeof options.instantSearch === 'object') {
        const { theme } = options.instantSearch
        if (theme) {
          if (theme in InstantSearchThemes) {
            nuxt.options.css.push(`instantsearch.css/themes/${theme}.css`)
          } else {
            logger.error('Invalid theme:', theme)
          }
        }
      }
    }

    // Polyfilling server packages for SSR support
    nuxt.hook('vite:extendConfig', (config, { isClient }) => {
      if (isClient) {
        (config as any).resolve.alias['@algolia/requester-node-http'] =
          'unenv/runtime/mock/empty'
      }
    })

    addPlugin(resolve(runtimeDir, 'plugin'))
    addImportsDir(resolve(runtimeDir, 'composables'))

    if (options?.indexer && Object.keys(options?.indexer).length) {
      const cmsProvider = Object.keys(options.indexer)[0]

      nuxt.options.runtimeConfig.algoliaIndexer = defu(nuxt.options.runtimeConfig.algoliaIndexer, {
        // @ts-ignore
        [cmsProvider]: options.indexer[cmsProvider]
      })

      addServerHandler({
        route: '/api/indexer',
        handler: resolve(runtimeDir, `server/api/${cmsProvider}`)
      })
    }
  }
})
