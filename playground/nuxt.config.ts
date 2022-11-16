import AlgoliaModule from '..'

export default defineNuxtConfig({
  modules: [
    AlgoliaModule
  ],
  algolia: {
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY ?? 'apiKey',
    applicationId: process.env.ALGOLIA_APPLICATION_ID ?? 'applicationId',
    lite: false, // by default set to 'true'
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
    }
  }
})
