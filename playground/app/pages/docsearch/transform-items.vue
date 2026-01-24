<template>
  <UContainer class="py-8 space-y-12">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary mb-4">
        Transform Items - DocSearch
      </h1>
      <p class="text-lg text-muted max-w-3xl mx-auto">
        Example of search results customization using the <code
          class="bg-elevated px-2 py-1 rounded">transformItems</code> function
      </p>
    </div>

    <!-- Basic Example -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-arrows-clockwise" class="w-6 h-6" />
        Uppercase URL Transformation
      </h2>
      <UPageCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Basic Example</h3>
            <UBadge label="transformItems" color="primary" />
          </div>
        </template>
        <template #body>
          <div class="space-y-4">
            <p class="text-sm text-muted">
              This example transforms result URLs to uppercase. Each result is modified before being displayed.
            </p>
            <UAlert color="info" variant="soft" title="Note"
              description="This is just a demonstrative example. In a real case, you would use transformItems to normalize URLs, add parameters, filter results, etc." />
            <div class="mt-4 p-4 bg-elevated rounded-lg">
              <AlgoliaDocSearch :transform-items="transformItems" />
            </div>
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- Code -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-code" class="w-6 h-6" />
        Implementation
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">Source Code</h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <div class="p-4 bg-elevated rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>&lt;script setup lang="ts"&gt;
import type { DocSearchProps } from '@docsearch/react'

const transformItems: DocSearchProps['transformItems'] = (items) => {
  return items.map(item => ({
    ...item,
    url: item.url.toUpperCase()
  }))
}
&lt;/script&gt;

&lt;template&gt;
  &lt;AlgoliaDocSearch :transform-items="transformItems" /&gt;
&lt;/template&gt;</code></pre>
            </div>
            <UAlert color="success" variant="soft" title="Tip"
              description="The transformItems function receives an array of items and must return a new array with the same structure. You can modify any property of the items." />
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- Common Use Cases -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-lightbulb" class="w-6 h-6" />
        Common Use Cases
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UPageCard variant="soft">
          <template #title>
            <span class="text-lg font-semibold text-primary">URL Normalization</span>
          </template>
          <template #description>
            <span class="text-sm text-muted">
              Convert absolute URLs to relative, add tracking parameters, or normalize paths.
            </span>
          </template>
        </UPageCard>
        <UPageCard variant="soft">
          <template #title>
            <span class="text-lg font-semibold text-primary">Result Filtering</span>
          </template>
          <template #description>
            <span class="text-sm text-muted">
              Remove duplicate results, filter by content type, or sort by custom relevance.
            </span>
          </template>
        </UPageCard>
        <UPageCard variant="soft">
          <template #title>
            <span class="text-lg font-semibold text-primary">Adding Metadata</span>
          </template>
          <template #description>
            <span class="text-sm text-muted">
              Add additional information to items, such as badges, icons, or custom descriptions.
            </span>
          </template>
        </UPageCard>
        <UPageCard variant="soft">
          <template #title>
            <span class="text-lg font-semibold text-primary">Reorganization</span>
          </template>
          <template #description>
            <span class="text-sm text-muted">
              Reorganize results by priority, category, or other custom criteria.
            </span>
          </template>
        </UPageCard>
      </div>
    </section>

    <!-- Advanced Example -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-stack" class="w-6 h-6" />
        Advanced Example
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">Complex Transformation</h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <p class="text-sm text-muted">
              More complex example combining multiple transformations:
            </p>
            <div class="p-4 bg-elevated rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>const transformItems: DocSearchProps['transformItems'] = (items) => {
  return items
    .map(item => ({
      ...item,
      // Normalize URL
      url: item.url.replace(/^https?:\/\/[^/]+/, ''),
      // Add badge for type
      _highlightResult: {
        ...item._highlightResult,
        type: { value: 'documentation', matchLevel: 'none' }
      }
    }))
    .filter(item => {
      // Filter only relevant results
      return item._rankingInfo && item._rankingInfo.userScore > 0
    })
    .sort((a, b) => {
      // Sort by relevance
      return (b._rankingInfo?.userScore || 0) - (a._rankingInfo?.userScore || 0)
    })
}</code></pre>
            </div>
          </div>
        </template>
      </UPageCard>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
import type { DocSearchProps } from '@docsearch/react'

const transformItems: DocSearchProps['transformItems'] = (items) => {
  return items.map(item => ({
    ...item,
    url: item.url.toUpperCase()
  }))
}

useHead({
  title: 'Transform Items - DocSearch'
})

useSeoMeta({
  description: 'Example of DocSearch results customization using transformItems'
})
</script>
