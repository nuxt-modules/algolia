<template>
  <UContainer class="py-8 space-y-12">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary mb-4">
        Algolia DocSearch - Playground
      </h1>
      <p class="text-lg text-muted max-w-3xl mx-auto">
        Complete examples and configurations for the AlgoliaDocSearch component for documentation search
      </p>
    </div>

    <!-- 1. Basic Example -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-magnifying-glass" class="w-6 h-6" />
        Basic Example
      </h2>
      <UPageCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Basic Search</h3>
            <UBadge label="Minimal configuration" color="primary" />
          </div>
        </template>
        <template #body>
          <div class="space-y-4">
            <p class="text-sm text-muted">
              This example uses only the required parameters from the configuration:
            </p>
            <ul class="list-disc list-inside text-sm text-muted space-y-1">
              <li><code class="bg-elevated px-2 py-1 rounded">apiKey</code></li>
              <li><code class="bg-elevated px-2 py-1 rounded">applicationId</code></li>
              <li><code class="bg-elevated px-2 py-1 rounded">docSearch.indexName</code></li>
            </ul>
            <div class="mt-4 p-4 bg-elevated rounded-lg">
              <AlgoliaDocSearch />
            </div>
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- 2. Custom Placeholder Example -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-text-aa" class="w-6 h-6" />
        Custom Placeholder
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">Placeholder Custom</h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <p class="text-sm text-muted">
              Customize the search placeholder text:
            </p>
            <div class="mt-4 p-4 bg-elevated rounded-lg">
              <AlgoliaDocSearch :placeholder="customPlaceholder" />
            </div>
            <UInput
              v-model="customPlaceholder"
              placeholder="Enter a custom placeholder..."
              class="max-w-md"
            />
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- 3. Initial Query Example -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-keyboard" class="w-6 h-6" />
        Initial Query
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">Initial Query</h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <p class="text-sm text-muted">
              Set an initial query that is shown when DocSearch opens:
            </p>
            <div class="mt-4 p-4 bg-elevated rounded-lg">
              <AlgoliaDocSearch :initial-query="initialQuery" />
            </div>
            <UInput
              v-model="initialQuery"
              placeholder="Enter an initial query..."
              class="max-w-md"
            />
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- 4. Facet Filters Example -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-funnel" class="w-6 h-6" />
        Facet Filters
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">Facet Filters</h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <p class="text-sm text-muted">
              Apply facet filters to limit search results:
            </p>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="filter in facetFilters"
                :key="filter"
                :label="filter"
                color="primary"
                variant="soft"
              />
            </div>
            <div class="mt-4 p-4 bg-elevated rounded-lg">
              <AlgoliaDocSearch :facet-filters="facetFilters" />
            </div>
            <div class="flex gap-2">
              <UInput
                v-model="newFacetFilter"
                placeholder="Add a facet filter..."
                class="flex-1 max-w-md"
                @keyup.enter="addFacetFilter"
              />
              <UButton
                label="Add"
                icon="i-ph-plus"
                @click="addFacetFilter"
              />
            </div>
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- 5. Search Parameters Example -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-sliders" class="w-6 h-6" />
        Search Parameters
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">Search Parameters</h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <p class="text-sm text-muted">
              Customize Algolia search parameters:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-primary mb-2 block">
                  Hits per page
                </label>
                <UInput
                  v-model.number="searchParameters.hitsPerPage"
                  type="number"
                  placeholder="20"
                />
              </div>
              <div>
                <label class="text-sm font-medium text-primary mb-2 block">
                  Attributes to retrieve
                </label>
                <UInput
                  v-model="attributesToRetrieve"
                  placeholder="title,description,url"
                />
              </div>
            </div>
            <div class="mt-4 p-4 bg-elevated rounded-lg">
              <AlgoliaDocSearch :search-parameters="computedSearchParameters" />
            </div>
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- 6. Full Configuration Example -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-gear" class="w-6 h-6" />
        Full Configuration
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">All Options</h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <p class="text-sm text-muted">
              Example with all options configured:
            </p>
            <div class="mt-4 p-4 bg-elevated rounded-lg">
              <AlgoliaDocSearch
                :placeholder="customPlaceholder"
                :initial-query="initialQuery"
                :facet-filters="facetFilters"
                :search-parameters="computedSearchParameters"
                :disable-user-personalization="disablePersonalization"
              />
            </div>
            <div class="space-y-2">
              <UCheckbox
                v-model="disablePersonalization"
                label="Disable user personalization"
              />
            </div>
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- 7. Props Documentation -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-book" class="w-6 h-6" />
        Props Documentation
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">Available Props</h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-muted">
                    <th class="text-left p-2 font-semibold text-primary">Prop</th>
                    <th class="text-left p-2 font-semibold text-primary">Type</th>
                    <th class="text-left p-2 font-semibold text-primary">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="prop in docSearchProps" :key="prop.name" class="border-b border-muted">
                    <td class="p-2">
                      <code class="bg-elevated px-2 py-1 rounded text-primary">{{ prop.name }}</code>
                    </td>
                    <td class="p-2 text-muted">{{ prop.type }}</td>
                    <td class="p-2 text-muted">{{ prop.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </UPageCard>
    </section>

    <!-- 8. Other Examples Available -->
    <section>
      <h2 class="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <UIcon name="i-ph-link" class="w-6 h-6" />
        Other Examples Available
      </h2>
      <UPageCard>
        <template #header>
          <h3 class="text-lg font-semibold">Advanced Examples</h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <p class="text-sm text-muted">
              Explore other advanced DocSearch examples available in the navigation menu:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="example in otherExamples"
                :key="example.path"
                class="p-4 bg-elevated rounded-lg border border-muted hover:border-primary transition-colors"
              >
                <div class="flex items-start gap-3">
                  <UIcon name="i-ph-arrow-right" class="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 class="font-semibold text-primary mb-1">{{ example.title }}</h4>
                    <p class="text-sm text-muted">{{ example.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </UPageCard>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'

// Configuration
const customPlaceholder = ref('Search the documentation...')
const initialQuery = ref('')
const facetFilters = ref<string[]>([])
const newFacetFilter = ref('')
const disablePersonalization = ref(false)
const attributesToRetrieve = ref('title,description,url')

const searchParameters = ref({
  hitsPerPage: 20
})

const computedSearchParameters = computed(() => {
  const params: any = {
    ...searchParameters.value
  }
  
  if (attributesToRetrieve.value) {
    params.attributesToRetrieve = attributesToRetrieve.value.split(',').map(s => s.trim())
  }
  
  return params
})

// Functions
const addFacetFilter = () => {
  if (newFacetFilter.value && !facetFilters.value.includes(newFacetFilter.value)) {
    facetFilters.value.push(newFacetFilter.value)
    newFacetFilter.value = ''
  }
}

// Props documentation
const docSearchProps = [
  {
    name: 'applicationId',
    type: 'string',
    description: 'Algolia application ID'
  },
  {
    name: 'apiKey',
    type: 'string',
    description: 'Algolia API key'
  },
  {
    name: 'indexName',
    type: 'string',
    description: "Algolia index name"
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Search placeholder text'
  },
  {
    name: 'searchParameters',
    type: 'SearchOptions',
    description: 'Custom Algolia search parameters'
  },
  {
    name: 'disableUserPersonalization',
    type: 'boolean',
    description: 'Disable user personalization'
  },
  {
    name: 'initialQuery',
    type: 'string',
    description: 'Initial query shown on open'
  },
  {
    name: 'facetFilters',
    type: 'string | string[]',
    description: 'Facet filters to apply'
  },
  {
    name: 'langAttribute',
    type: 'string',
    description: 'Attribute for language (default: "language")'
  },
  {
    name: 'lang',
    type: 'string',
    description: 'Default language'
  },
  {
    name: 'transformItems',
    type: 'Function',
    description: 'Function to transform items before display'
  },
  {
    name: 'hitComponent',
    type: 'Function',
    description: 'Custom component for each result'
  },
  {
    name: 'transformSearchClient',
    type: 'Function',
    description: 'Function to transform the search client (e.g. debounce)'
  },
  {
    name: 'navigator',
    type: 'Object',
    description: 'Custom implementation of the Navigator API'
  },
  {
    name: 'getMissingResultsUrl',
    type: 'Function',
    description: 'Function to get the URL when there are no results'
  }
]

// Other examples available in the menu
const otherExamples = [
  {
    title: 'Transform Items',
    description: 'Customize search results using transformItems',
    path: '/docsearch/transform-items'
  },
  {
    title: 'Debounce Search',
    description: 'Optimize performance with search debounce',
    path: '/docsearch/debounce-search'
  }
]

// SEO
useHead({
  title: 'Algolia DocSearch - Playground'
})

useSeoMeta({
  description: 'Complete playground for AlgoliaDocSearch with examples of all available configurations'
})
</script>
