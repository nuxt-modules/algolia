import defu from 'defu'
import { resolve } from 'pathe'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { AlgoliaOptions } from './types'

export default defineNuxtModule<AlgoliaOptions>({
  name: '@nuxt-commerce/algolia',
  configKey: 'algolia',
  setup (options: AlgoliaOptions, nuxt: Nuxt) {
    if (!options.apiKey) {
      throw new Error('Missing `apiKey`')
    }

    if (!options.applicationId) {
      throw new Error('Missing `applicationId`')
    }

    // Default runtimeConfig
    nuxt.options.publicRuntimeConfig.algolia = defu(nuxt.options.publicRuntimeConfig.algolia, {
      apiKey: options.apiKey,
      applicationId: options.applicationId
    })

    // Add plugin to load user before bootstrap
    addPlugin(resolve(__dirname, './plugins/algolia'))

    // Add useAlgolia composable
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
