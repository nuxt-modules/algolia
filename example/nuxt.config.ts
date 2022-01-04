import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  buildModules: [
    '../src/module'
  ],
  bigcommerce: {
    storefrontToken: process.env.BIGCOMMERCE_STOREFRONT_TOKEN,
    apiToken: process.env.BIGCOMMERCE_API_TOKEN,
    storeUrl: process.env.BIGCOMMERCE_STORE_URL,
    storeHash: process.env.BIGCOMMERCE_STORE_HASH,
    channelId: 1,
    // Due to issues with CORS this would have to become a required
    enableServerMiddleware: true // Optional
    // includeValuesInRuntimeConfig: ['storefrontToken'] // Optional
})
