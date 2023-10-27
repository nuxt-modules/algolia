<template>
  <main>
    <div v-if="isDocsearchEnabled">
      <h1>DocSearch plugin</h1>

      <div>
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </div>
      <div style="display: flex; gap: 0.5rem;margin-bottom: 3rem;">
        <NuxtLink to="/docsearch">
          Basic example
        </NuxtLink>
        <NuxtLink to="/docsearch/transform-items">
          Transforming items
        </NuxtLink>
        <NuxtLink to="/docsearch/debounce-search">
          Debouncing search
        </NuxtLink>
      </div>

      <div>
        <NuxtPage />
      </div>
    </div>

    <div v-else>
      DocSearch plugin is currently disabled.

      See the <a href="https://algolia.nuxtjs.org/advanced/docsearch#configuration">configuration docs</a> on how to enable it.
    </div>
  </main>
</template>

<script setup lang="ts">
const { algolia: { docSearch } } = useRuntimeConfig().public
const isDocsearchEnabled = computed(() => Boolean(docSearch))
</script>
