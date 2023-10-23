<template>
  <div>
    <AlgoliaDocSearch :transform-items="transformItems" />

    <div style="margin-top: 2rem;">
      This example uses a custom function for transforming search results. The URL of each item is now in uppercase, which is a bit silly, but this is just an example.
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocSearchProps } from 'docsearch'

const transformItems: DocSearchProps['transformItems'] = (items) => {
  return items.map(item => ({
    ...item,
    url: item.url.toUpperCase()
  }))
}
</script>
