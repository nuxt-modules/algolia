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
  </div>
</template>

<script lang="ts" setup>
const indexName = 'super_index'
const { result, search } = useSearch(indexName)
const { result: searchForFacetValuesResult, search: searchForFacetValues } = useSearchForFacetValues(indexName)
const algolia = useAlgolia()

onMounted(async () => {
  await search({ query: 'Samsung', requestOptions: { filters: 'objectID:ecommerce-sample-data-99' } })
  const facet = {
    name: 'categories',
    query: 'Cell Phones'
  }
  await searchForFacetValues({ facet })
})
</script>
