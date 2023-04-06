<template>
  <div>
    <pre> {{ result?.hits }}</pre>
    <pre>{{ searchForFacetValuesResult }}</pre>
    <div>
      <h1>Instantsearch plugin</h1>
      <ais-instant-search :index-name="indexName" :search-client="algolia">
        <ais-search-box />
        <ais-hits />
      </ais-instant-search>
    </div>
    <pre>{{ recommendResult?.results }}</pre>

    <div v-if="docSearch">
      <h3>DocSearch plugin</h3>
      <AlgoliaDocSearch :options="docSearch" />
    </div>
    <NuxtLink to="/other-page">
      Other page
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { useSeoMeta } from '@unhead/vue'
import { AisInstantSearch, AisSearchBox, AisHits } from 'vue-instantsearch/vue3/es'
// Grab DocSearch config from nuxt.config
// (the component does that by itself as well)
const { algolia: { docSearch } } = useRuntimeConfig()

// Used to try the refresh of the component on options changes
const indexName = ref('test_index')

// AlgoliaSearch wrapped in useAsyncData
const asyncResult = await useAsyncAlgoliaSearch({ query: 'Samsung', indexName: indexName.value })

const { result, search } = useAlgoliaSearch(indexName.value)
const { result: searchForFacetValuesResult, search: searchForFacetValues } = useAlgoliaFacetedSearch(indexName.value)
const algolia = useAlgoliaRef()
const { result: recommendResult, get } = useAlgoliaRecommend()

// Just add some indices in ./playground/types.d.ts, they should then be autocompleted here
const { search: typedSearch } = useAlgoliaInitIndex('test_index')

// SSR Searching for results
const { data } = await useAsyncData('ssr-search-results', () => search({ query: 'Samsung' }))

onMounted(async () => {
  // useSearch
  await search({ query: 'Samsung', requestOptions: { filters: 'objectID:ecommerce-sample-data-99' } })

  // useSearchForFacetValues
  const facet = {
    name: 'categories',
    query: 'Cell Phones'
  }
  await searchForFacetValues({ facet })

  // useAlgoliaRecommend
  await get({ queries: [{ indexName: indexName.value, model: 'related-products', objectID: 'ecommerce-sample-data-99' }] })

  // Notice the type of typedFoo is inferred from the type of the result of the call to useInitIndex
  const typedFoo = await typedSearch('foo')

  // @ts-expect-error bar should be a number
  typedFoo.hits[0].bar = '1'
  // There should be no error
  typedFoo.hits[0].foo = '1'
})

useHead({
  title: 'Nuxt Algolia'
})

useSeoMeta({
  description: 'Playground for @nuxtjs/algolia'
})
</script>
