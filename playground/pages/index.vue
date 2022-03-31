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

    <div v-if="algoliaConfig.docSearch">
      <h3>DocSearch plugin</h3>

      <DocSearch :options="algoliaConfig" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const indexName = 'test_index'

const { algolia: algoliaConfig } = useRuntimeConfig()

const { result, search } = useSearch(indexName)
const { result: searchForFacetValuesResult, search: searchForFacetValues } = useSearchForFacetValues(indexName)
const algolia = useAlgolia()
const { result: recommendResult, get } = useAlgoliaRecommend()

// Just add some indices in ./playground/types.d.ts, they should then be autocompleted here
const { search: typedSearch } = useInitIndex('coolIndex')

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
  await get({ queries: [{ indexName, model: 'related-products', objectID: 'ecommerce-sample-data-99' }] })

  // Notice the type of typedFoo is inferred from the type of the result of the call to useInitIndex
  const typedFoo = await typedSearch('foo')

  // @ts-expect-error bar should be a number
  typedFoo.hits[0].bar = '1'
  // There should be no error
  typedFoo.hits[0].foo = '1'
})
</script>
