<template>
  <div>
    {{ result }}
  </div>
</template>

<script lang="ts" setup>
const { result, search } = useSearch('test_index')
const algolia = useAlgolia();

onMounted(async () => {
  await search({ query: 'Samsung' })
})
</script>
