import AlgoliaModule from '..'

export default defineNuxtConfig({
  modules: [
    AlgoliaModule
  ],
  nitro: {
    routeRules: {
      '/': {
        prerender: true
      }
    }
  },
  algolia: {
    // apiKey: process.env.ALGOLIA_API_KEY,
    // applicationId: process.env.ALGOLIA_APPLICATION_ID,
    lite: false, // by default set to 'true'
    cache: true,
    docSearch: {
      indexName: process.env.ALGOLIA_DOCSEARCH_INDEX_NAME ?? 'indexName',
      facetFilters: process.env.ALGOLIA_DOCSEARCH_FACET_FILTERS ?? ''
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
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN
      }
    },
    crawler: {
      apiKey: process.env.ALGOLIA_CRAWLER_API_KEY,
      indexName: process.env.ALGOLIA_CRAWLER_INDEX_NAME
    }
  }
})
