<template>
  <div v-if="isDocsearchEnabled">
    <NuxtPage />
  </div>

  <UContainer v-else class="py-16">
    <div class="text-center">
      <UIcon name="i-ph-warning" class="w-16 h-16 text-warning mx-auto mb-4" />
      <h1 class="text-3xl font-bold text-primary mb-4">
        DocSearch plugin is currently disabled
      </h1>
      <p class="text-lg text-muted mb-6">
        See the <a href="https://algolia.nuxtjs.org/advanced/docsearch#configuration" target="_blank" class="text-primary hover:underline">configuration docs</a> on how to enable it.
      </p>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { algolia: { docSearch } } = useRuntimeConfig().public
const isDocsearchEnabled = computed(() => Boolean(docSearch))
</script>
