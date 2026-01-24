<template>
  <UContainer class="py-8 space-y-12">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary mb-4">
        Nuxt Algolia - Playground
      </h1>
      <p class="text-lg text-muted max-w-3xl mx-auto">
        Complete examples of all features and composables available in the @nuxtjs/algolia module
      </p>
    </div>

    <!-- 1. useAlgoliaSearch - Basic Search -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon
          name="i-ph-magnifying-glass"
          class="w-6 h-6"
        />
        useAlgoliaSearch - Basic Search
      </h2>
      <div class="space-y-4">
        <UPageCard :ui="{ header: 'w-full border-bottom-1 border-muted' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">
                Interactive Search
              </h3>
              <UBadge
                :label="`${searchResult?.nbHits || 0} results`"
                color="primary"
              />
            </div>
          </template>
          <template #body>
            <div class="space-y-4">
              <UInput
                v-model="searchQuery"
                placeholder="Search products..."
                icon="i-ph-magnifying-glass"
                @input="handleSearch"
              />
              <div
                v-if="searchResult?.hits?.length"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <UPageCard
                  v-for="item in searchResult.hits.slice(0, 6)"
                  :key="item.objectID"
                  :title="(item as any).name || 'Unnamed'"
                  :description="(item as any).description || 'No description available'"
                  variant="soft"
                />
              </div>
              <UAlert
                v-else-if="searchQuery && !searchResult?.hits?.length"
                color="warning"
                variant="soft"
                title="No results found"
                description="Try a different query"
              />
            </div>
          </template>
        </UPageCard>
      </div>
    </section>

    <!-- 2. useAsyncAlgoliaSearch - SSR Search -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon
          name="i-ph-cloud-arrow-down"
          class="w-6 h-6"
        />
        useAsyncAlgoliaSearch - SSR Search
      </h2>
      <UPageCard :ui="{ header: 'w-full border-bottom-1 border-muted' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              Pre-loaded Results (SSR)
            </h3>
            <UBadge
              :label="`${asyncSearchData?.nbHits || 0} results`"
              color="primary"
            />
          </div>
        </template>
        <template #body>
          <div
            v-if="asyncSearchData?.hits?.length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <UPageCard
              v-for="item in asyncSearchData.hits.slice(0, 6)"
              :key="item.objectID"
              :title="(item as any).name || 'Unnamed'"
              :description="(item as any).description || 'No description available'"
              variant="soft"
            />
          </div>
          <UAlert
            v-else
            color="info"
            variant="soft"
            title="Loading..."
            description="Results are loaded during server-side rendering"
          />
        </template>
      </UPageCard>
    </section>

    <!-- 3. useAlgoliaFacetedSearch - Facet Search -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon
          name="i-ph-funnel"
          class="w-6 h-6"
        />
        useAlgoliaFacetedSearch - Search for Facet Values
      </h2>
      <UPageCard :ui="{ header: 'flex items-center justify-between w-full border-bottom-1 border-muted' }">
        <template #header>
          <h3 class="text-lg font-semibold">
            Search for Facet Values
          </h3>
          <UBadge
            :label="`${facetSearchResult?.facetHits?.length || 0} values found`"
            color="primary"
          />
        </template>
        <template #body>
          <div class="space-y-4">
            <div class="flex gap-4">
              <UInput
                v-model="facetQuery"
                placeholder="Search in category..."
                icon="i-ph-funnel"
                class="flex-1"
              />
              <UButton
                label="Search"
                icon="i-ph-magnifying-glass"
                @click="handleFacetSearch"
              />
            </div>
            <div
              v-if="facetSearchResult?.facetHits?.length"
              class="space-y-2"
            >
              <div
                v-for="(hit, index) in facetSearchResult.facetHits"
                :key="index"
                class="p-3 bg-elevated rounded-lg flex items-center justify-between"
              >
                <div>
                  <span class="font-medium text-primary">{{ hit.value }}</span>
                  <span class="text-sm text-muted ml-2">({{ hit.count }} results)</span>
                </div>
                <UBadge
                  :label="hit.value"
                  color="primary"
                  variant="soft"
                />
              </div>
            </div>
            <UAlert
              v-else-if="facetQuery && !facetSearchResult?.facetHits?.length"
              color="warning"
              variant="soft"
              title="No results found"
              description="Try a different category query"
            />
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- 4. useAlgoliaRecommend - Recommendations -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon
          name="i-ph-sparkle"
          class="w-6 h-6"
        />
        useAlgoliaRecommend - Recommendations
      </h2>
      <UPageCard :ui="{ header: 'w-full border-bottom-1 border-muted' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              Related Products
            </h3>
            <UBadge
              :label="`${recommendResult?.results?.[0]?.hits?.length || 0} recommendations`"
              color="primary"
            />
          </div>
        </template>
        <template #body>
          <div
            v-if="recommendResult?.results?.[0]?.hits?.length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <UPageCard
              v-for="item in recommendResult.results[0].hits.slice(0, 6)"
              :key="item.objectID"
              :title="(item as any).name || 'Unnamed'"
              :description="(item as any).description || 'No description available'"
              variant="soft"
              spotlight
              spotlight-color="primary"
            />
          </div>
          <UAlert
            v-else
            color="info"
            variant="soft"
            title="Loading recommendations..."
            description="Recommendations are loaded when the component mounts"
          />
        </template>
      </UPageCard>
    </section>

    <!-- 5. useAlgoliaInitIndex - Typed Search -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon
          name="i-ph-code"
          class="w-6 h-6"
        />
        useAlgoliaInitIndex - Typed Search
      </h2>
      <UPageCard :ui="{ header: 'w-full border-bottom-1 border-muted' }">
        <template #header>
          <h3 class="text-lg font-semibold">
            Search with TypeScript
          </h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <UAlert
              color="success"
              variant="soft"
              title="Type Safety"
              description="This composable provides full type safety for Algolia indices. Types are automatically inferred from the types.d.ts file"
            />
            <div class="p-4 bg-elevated rounded-lg">
              <code class="text-sm text-muted">
                const { search } = useAlgoliaInitIndex('test_index')<br>
                const result = await search('query')<br>
                // result.hits[0] has full types!
              </code>
            </div>
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- 6. Statistics and Info -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon
          name="i-ph-chart-bar"
          class="w-6 h-6"
        />
        Statistics and Information
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UPageCard>
          <template #body>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary mb-2">
                {{ searchResult?.nbHits || asyncSearchData?.nbHits || 0 }}
              </div>
              <div class="text-sm text-muted">
                Total Results
              </div>
            </div>
          </template>
        </UPageCard>
        <UPageCard>
          <template #body>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary mb-2">
                {{ searchResult?.processingTimeMS || asyncSearchData?.processingTimeMS || 0 }}ms
              </div>
              <div class="text-sm text-muted">
                Processing Time
              </div>
            </div>
          </template>
        </UPageCard>
        <UPageCard>
          <template #body>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary mb-2">
                {{ indexName }}
              </div>
              <div class="text-sm text-muted">
                Active Index
              </div>
            </div>
          </template>
        </UPageCard>
      </div>
    </section>
  </UContainer>
</template>

<script lang="ts" setup>
import { useSeoMeta } from '#imports'

// Configuration
const indexName = ref('test_index')
const searchQuery = ref('Samsung')
const facetQuery = ref('Cell Phones')

// 1. useAlgoliaSearch - Reactive basic search
const { result: searchResult, search } = useAlgoliaSearch(indexName.value)

// 2. useAsyncAlgoliaSearch - SSR Search
const asyncResult = await useAsyncAlgoliaSearch({
  query: 'Samsung',
  indexName: indexName.value,
})
const asyncSearchData = computed(() => asyncResult.data.value)

// 3. useAlgoliaFacetedSearch - Search for facet values
const { result: facetSearchResult, search: searchForFacetValues } = useAlgoliaFacetedSearch(indexName.value)

// 4. useAlgoliaRecommend - Recommendations
const { result: recommendResult, get: getRecommendations } = useAlgoliaRecommend()

// 5. useAlgoliaInitIndex - Typed search
const { search: typedSearch } = useAlgoliaInitIndex('test_index')

// Search functions
const handleSearch = async () => {
  if (searchQuery.value) {
    await search({
      query: searchQuery.value,
      requestOptions: {},
    })
  }
}

const handleFacetSearch = async () => {
  if (facetQuery.value) {
    await searchForFacetValues({
      facet: {
        name: 'categories',
        query: facetQuery.value,
      },
    })
  }
}

// SSR: Initial search
await useAsyncData('ssr-search-results', () =>
  search({ query: 'Samsung' }),
)

// Al mount: carica raccomandazioni e facet search
onMounted(async () => {
  try {
    // Initial search
    await search({ query: 'Samsung' })

    // Search for facet values
    try {
      await searchForFacetValues({
        facet: {
          name: 'categories',
          query: 'Cell Phones',
        },
      })
    }
    catch (error) {
      console.warn('Facet search error:', error)
      // Continue even if facet search fails
    }

    // Load recommendations
    try {
      await getRecommendations({
        queries: [
          {
            indexName: indexName.value,
            model: 'related-products',
            objectID: 'ecommerce-sample-data-99',
            threshold: 0,
          },
        ],
      })
    }
    catch (error) {
      console.warn('Recommendations error:', error)
      // Continue even if recommendations fail
    }

    // Typed search example (for TypeScript demonstration)
    try {
      const typedResult = await typedSearch('foo')
      console.log('Typed search result:', typedResult)
    }
    catch (error) {
      console.warn('Typed search error:', error)
    }
  }
  catch (error) {
    console.error('Error in onMounted:', error)
  }
})

// SEO
useHead({
  title: 'Nuxt Algolia - Playground',
})

useSeoMeta({
  description: 'Complete playground for @nuxtjs/algolia with examples of all available features',
})
</script>
