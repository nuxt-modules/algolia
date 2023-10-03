<template>
  <div>
    <AlgoliaDocSearch :transform-search-client="transformSearchClient" />

    <div style="margin-top: 2rem;">
      This example uses a custom `SearchClient` which debounces the search requests.
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchClient } from 'algoliasearch'
import { DocSearchProps } from 'docsearch'

const transformSearchClient: DocSearchProps['transformSearchClient'] = (searchClient) => {
  return {
    ...searchClient,
    search: debounce(searchClient.search, 5000)
  } as SearchClient
}

function debounce (func: (...args: unknown[]) => unknown, wait = 100) {
  let lastTimeout = null

  return function (...args) {
    const that = this
    return new Promise((resolve, reject) => {
      if (lastTimeout) {
        clearTimeout(lastTimeout)
      }
      lastTimeout = setTimeout(() => {
        lastTimeout = null
        Promise.resolve(func.apply(that, args)).then(resolve).catch(reject)
      }, wait)
    })
  }
}
</script>
