<template>
  <UContainer class="py-8 space-y-12">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary mb-4">
        Debounce Search - DocSearch
      </h1>
      <p class="text-lg text-muted max-w-3xl mx-auto">
        Example of search debouncing using <code class="bg-elevated px-2 py-1 rounded">transformSearchClient</code> to
        optimize performance
      </p>
    </div>

    <!-- Basic Example -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon
          name="i-ph-timer"
          class="w-6 h-6"
        />
        Search Debouncing
      </h2>
      <UPageCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              Example with Debounce
            </h3>
            <UBadge
              :label="`Delay: ${debounceDelay}ms`"
              color="primary"
            />
          </div>
        </template>
        <template #body>
          <div class="space-y-4">
            <p class="text-sm text-muted">
              This example applies a debounce to search requests. Searches are executed only after the user has stopped
              typing for the specified time.
            </p>
            <UAlert
              color="warning"
              variant="soft"
              title="Note"
              description="The delay is set to 5000ms (5 seconds) for this example to clearly demonstrate the effect. In production, use lower values (200-500ms)."
            />
            <div class="flex items-center gap-4">
              <label class="text-sm font-medium text-primary">
                Delay (ms):
              </label>
              <UInput
                v-model.number="debounceDelay"
                type="number"
                :min="0"
                :max="10000"
                class="w-32"
              />
            </div>
            <div class="mt-4 p-4 bg-elevated rounded-lg">
              <AlgoliaDocSearch :transform-search-client="transformSearchClient" />
            </div>
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- Performance Comparison -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon
          name="i-ph-chart-line"
          class="w-6 h-6"
        />
        Benefits of Debouncing
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UPageCard variant="soft">
          <template #title>
            <span class="text-lg font-semibold text-primary flex items-center gap-2">
              <UIcon
                name="i-ph-lightning"
                class="w-5 h-5"
              />
              Performance
            </span>
          </template>
          <template #description>
            <span class="text-sm text-muted">
              Reduces the number of API requests, improving performance and reducing costs.
            </span>
          </template>
        </UPageCard>
        <UPageCard variant="soft">
          <template #title>
            <span class="text-lg font-semibold text-primary flex items-center gap-2">
              <UIcon
                name="i-ph-battery"
                class="w-5 h-5"
              />
              Bandwidth
            </span>
          </template>
          <template #description>
            <span class="text-sm text-muted">
              Reduces network bandwidth usage, especially important on mobile devices.
            </span>
          </template>
        </UPageCard>
        <UPageCard variant="soft">
          <template #title>
            <span class="text-lg font-semibold text-primary flex items-center gap-2">
              <UIcon
                name="i-ph-smiley"
                class="w-5 h-5"
              />
              UX
            </span>
          </template>
          <template #description>
            <span class="text-sm text-muted">
              Improves user experience by avoiding results that change too quickly while typing.
            </span>
          </template>
        </UPageCard>
      </div>
    </section>

    <!-- Code -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon
          name="i-ph-code"
          class="w-6 h-6"
        />
        Implementation
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">
            Source Code
          </h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <div class="p-4 bg-elevated rounded-lg overflow-x-auto">
              <pre class="text-sm"><code>&lt;script setup lang="ts"&gt;
import type { SearchClient } from 'algoliasearch'
import type { DocSearchProps } from '@docsearch/react'

const debounceDelay = ref(500)

const transformSearchClient: DocSearchProps['transformSearchClient'] = (searchClient) => {
  return {
    ...searchClient,
    search: debounce(searchClient.search, debounceDelay.value)
  } as SearchClient
}

function debounce(func: (...args: unknown[]) => unknown, wait = 100) {
  let lastTimeout = null

  return function (...args) {
    const that = this
    return new Promise((resolve, reject) => {
      if (lastTimeout) {
        clearTimeout(lastTimeout)
      }
      lastTimeout = setTimeout(() => {
        lastTimeout = null
        Promise.resolve(func.apply(that, args))
          .then(resolve)
          .catch(reject)
      }, wait)
    })
  }
}
&lt;/script&gt;</code></pre>
            </div>
            <UAlert
              color="success"
              variant="soft"
              title="Tip"
              description="The transformSearchClient function receives the original SearchClient and must return a new client with modified methods. Debounce is applied to the search method."
            />
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- Recommended Values -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon
          name="i-ph-sliders"
          class="w-6 h-6"
        />
        Recommended Values
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">
            Optimal Delay
          </h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 bg-elevated rounded-lg">
                <div class="font-semibold text-primary mb-2">
                  Desktop
                </div>
                <div class="text-sm text-muted">
                  <code class="bg-muted px-2 py-1 rounded">200-300ms</code>
                  <p class="mt-2">
                    Balance between responsiveness and performance.
                  </p>
                </div>
              </div>
              <div class="p-4 bg-elevated rounded-lg">
                <div class="font-semibold text-primary mb-2">
                  Mobile
                </div>
                <div class="text-sm text-muted">
                  <code class="bg-muted px-2 py-1 rounded">300-500ms</code>
                  <p class="mt-2">
                    Reduces requests to preserve battery life.
                  </p>
                </div>
              </div>
            </div>
            <UAlert
              color="warning"
              variant="soft"
              title="Warning"
              description="Values too high (>1000ms) can make searching frustrating for the user. Values too low (<100ms) do not provide significant benefits."
            />
          </div>
        </template>
      </UPageCard>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
import type { SearchClient } from 'algoliasearch'
import type { DocSearchProps } from '@docsearch/react'

const debounceDelay = ref(5000) // 5 seconds for demonstration

const transformSearchClient: DocSearchProps['transformSearchClient'] = (searchClient) => {
  return {
    ...searchClient,
    search: debounce(searchClient.search, debounceDelay.value),
  } as SearchClient
}

function debounce(func: (...args: unknown[]) => unknown, wait = 100) {
  let lastTimeout: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: unknown[]) {
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

useHead({
  title: 'Debounce Search - DocSearch',
})

useSeoMeta({
  description: 'Example of DocSearch search debouncing to optimize performance',
})
</script>
