import defu from 'defu'
import { resolve } from 'pathe'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import type { AlgoliaOptions, CrawlerPage } from './types'
import { createGenerateDoneHook, createPageGenerateHook } from './hooks/crawler'

export default defineNuxtModule<AlgoliaOptions>({
  meta: {
    name: '@nuxt-modules/algolia',
    configKey: 'algolia'
  },
  defaults: {
    applicationId: '',
    apiKey: '',
    lite: true,
    crawler: {
      apiKey: '',
      indexName: '',
      include: () => true,
      meta: ['title', 'description']
    }
  },
  setup (options, nuxt) {
    if (!options.apiKey) {
      throw new Error('Missing `apiKey`')
    }

    if (!options.applicationId) {
      throw new Error('Missing `applicationId`')
    }

    if (options.crawler.apiKey || options.crawler.indexName) {
      if (!options.crawler.apiKey) {
        throw new Error('Missing `crawler.apiKey`')
      }

      if (!options.crawler.indexName) {
        throw new Error('Missing `crawler.indexName`')
      }

      const pages: CrawlerPage[] = []

      nuxt.addHooks({
        'generate:page': createPageGenerateHook(nuxt, options, pages),
        'generate:done': createGenerateDoneHook(nuxt, options, pages)
      })
    }

    nuxt.options.publicRuntimeConfig.algolia = defu(nuxt.options.publicRuntimeConfig.algolia, {
      apiKey: options.apiKey,
      applicationId: options.applicationId,
      // Use Lite version by default
      lite: options.lite
    })

    addPlugin(resolve(__dirname, './plugins/algolia'))

    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(__dirname, './composables'))
    })
  }
})

export * from './types'

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      algolia?: AlgoliaOptions
    }
  }
  interface NuxtConfig {
    algolia?: AlgoliaOptions
  }
  interface NuxtOptions {
    algolia?: AlgoliaOptions
  }
}
