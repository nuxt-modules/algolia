import AlgoliaModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [AlgoliaModule],
  algolia: {
    applicationId: 'app-id',
    apiKey: 'search-key'
  },
  runtimeConfig: {
    algolia: {
      adminApiKey: 'admin-key'
    },
    public: {
      algolia: {
        globalIndex: 'public-index'
      }
    }
  }
})
