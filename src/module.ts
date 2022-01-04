import defu from 'defu'
import { resolve } from 'pathe'
import { defineNuxtModule, addPlugin, addServerMiddleware } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { BigCommerceConfigOptions } from './types'

export default defineNuxtModule<BigCommerceConfigOptions>({
  name: '@nuxt-commerce/bigcommerce',
  configKey: 'bigcommerce',
  setup (_options: BigCommerceConfigOptions, nuxt: Nuxt) {

    // TODO: fix that server middleware registration
    addServerMiddleware({ handle: resolve('./server/middleware') })

    // Add plugin to load user before bootstrap
    addPlugin(resolve(__dirname, './plugins/bigcommerce'))

    // Add strapi composables
    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(__dirname, './composables'))
    })
  }
})

export * from './types'

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      bigcommerce?: BigCommerceConfigOptions
    }
  }
  interface NuxtConfig {
    bigcommerce?: BigCommerceConfigOptions
  }
  interface NuxtOptions {
    bigcommerce?: BigCommerceConfigOptions
  }
}
