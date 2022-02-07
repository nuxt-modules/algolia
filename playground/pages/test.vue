<template>
  <ais-instant-search index-name="test_index" :search-client="algolia">
    <ais-search-box />
    <ais-hits />
  </ais-instant-search>
</template>

<script lang="ts" setup>
const algolia = useAlgolia()
</script>
