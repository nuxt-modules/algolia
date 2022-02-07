import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import type { MetaData } from 'metadata-scraper/lib/types'
import defu from 'defu'
import { createPageGenerateHook, createGenerateDoneHook, CrawlerPage, CrawlerHooks } from './hooks'

export interface ModuleOptions {
  applicationId: string;
  apiKey: string;
  lite: boolean;
  instantSearch: boolean;
  crawler: {
    apiKey: string;
    indexName: string;
    meta:
            | ((html: string, route: string) => MetaData|Promise<MetaData>)
            | (keyof MetaData)[]
    include: ((route: string) => boolean) | (string | RegExp)[]
  }
};

export interface ModuleHooks extends CrawlerHooks {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt-modules/algolia',
    configKey: 'algolia'
  },
  defaults: {
    applicationId: '',
    apiKey: '',
    lite: true,
    instantSearch: true,
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
      lite: options.lite,
      instantSearch: options.instantSearch
    })

    if (options.instantSearch) {
      nuxt.options.build.transpile.push('vue-instantsearch/vue3')
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugin'))

    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })
  }
})
