<template>
  <h1>
    [Client] Algolia Search Results for query: 'Samsung' with optional filters
  </h1>
  {{ result }}
  <h2>[SSR] Algolia Search Result for query: 'Samsung'</h2>
  {{ data }}
</template>

<script setup>
const { result, search } = useAlgoliaSearch("test_index"); // pass your index as param

onMounted(async () => {
  await search({
    query: "Samsung",
    requestOptions: { filters: "objectID:ecommerce-sample-data-99" },
  });
});

const { data } = await useAsyncAlgoliaSearch({
  indexName: "test_index",
  query: "Samsung",
});
</script>
