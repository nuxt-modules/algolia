<template>
  <div>
    {{ result?.hits }}
  </div>
</template>

<script lang="ts" setup>
const { result, search } = useSearch('test_index')
const algoliaIndex = useInitIndex('test')
const algolia = useAlgolia()

console.log(algolia)
console.log(algoliaIndex)

onMounted(async () => {
  await search({ query: 'Samsung', requestOptions: { filters: 'objectID:ecommerce-sample-data-99' } })
})
</script>
