import { defineNuxtConfig } from 'nuxt3'
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
      apiKey: process.env.ALGOLIA_DOCSEARCH_API_KEY ?? 'apiKey',
      applicationId: process.env.ALGOLIA_DOCSEARCH_APPLICATION_ID ?? 'applicationId',
      indexName: process.env.ALGOLIA_DOCSEARCH_INDEX_NAME ?? 'indexName',
      facetFilters: process.env.ALGOLIA_DOCSEARCH_FACET_FILTERS ? process.env.ALGOLIA_DOCSEARCH_FACET_FILTERS.split(',') : []
    },
    instantSearch: {
      theme: 'algolia'
    },
    recommend: true
  }
})
