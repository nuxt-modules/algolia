export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/ui'
  ],

  nitro: {
    prerender: {
      crawlLinks: true
    },
    routeRules: {
      '/': {
        prerender: true
      }
    }
  },

  algolia: {
    apiKey: process.env.ALGOLIA_API_KEY ?? '0fd1c4eba2f831788333e77c9d855f1d',
    applicationId: process.env.ALGOLIA_APPLICATION_ID ?? 'AGN9HUEKF3',
    lite: false, // by default set to 'true'
    cache: true,
    docSearch: {
      applicationId: 'PMZUYBQDAK',
      apiKey: '24b09689d5b4223813d9b8e48563c8f6',
      indexName: 'docsearch'
    },
    instantSearch: {
      theme: 'algolia'
    },
    recommend: true,
    indexer: {
      storyblok: {
        secret: process.env.INDEXER_SECRET,
        algoliaAdminApiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
        contentVersion: process.env.STORYBLOK_CONTENT_VERSION || 'draft'
      }
    },
    crawler: {
      apiKey: process.env.ALGOLIA_CRAWLER_API_KEY,
      indexName: process.env.ALGOLIA_CRAWLER_INDEX_NAME
    }
  },
  css: ["./playground/app/assets/css/main.css"],

  compatibilityDate: '2026-01-24'
})