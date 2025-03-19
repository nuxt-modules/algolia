export default defineNuxtConfig({
  modules: [
    '../src/module'
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
      indexName: process.env.ALGOLIA_DOCSEARCH_INDEX_NAME ?? 'docsearch'
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
        contentVersion: process.env.STORYBLOK_CONTENT_VERSION
      }
    },
    crawler: {
      apiKey: process.env.ALGOLIA_CRAWLER_API_KEY,
      indexName: process.env.ALGOLIA_CRAWLER_INDEX_NAME
    }
  },

  compatibilityDate: '2025-03-19'
})