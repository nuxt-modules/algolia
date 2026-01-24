<template>
  <div
    :id="containerId"
    :data-docsearch-id="containerId"
  >
    <button
      type="button"
      class="DocSearch DocSearch-Button"
      aria-label="Search"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { withoutTrailingSlash } from 'ufo'
import type { ModuleBaseOptions, SearchOptions } from '../../types'
import type { DocSearchTranslations, DocSearchProps } from '@docsearch/react'
import { useRuntimeConfig, useRoute, useRouter, onMounted, onUnmounted, watch, nextTick } from '#imports'

const route = useRoute()
const router = useRouter()

// Generate unique container ID for each instance
// Use a static ID on server to avoid SSR mismatch, then generate unique ID on client
const containerId = ref('docsearch')
const containerSelector = computed(() => `#${containerId.value}`)

// Generate UUID function
// TODO search for a better way to generate a unique ID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Store DocSearch instance for cleanup
let docSearchInstance: DocSearchFunc | null = null

const props = defineProps({
  applicationId: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.applicationId,
  },
  apiKey: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.apiKey,
  },
  indexName: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.indexName,
  },
  placeholder: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.placeholder,
  },
  searchParameters: {
    type: Object as PropType<SearchOptions>,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.searchParameters,
  },
  disableUserPersonalization: {
    type: Boolean,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.disableUserPersonalization,
  },
  initialQuery: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.initialQuery,
  },
  translations: {
    type: Object as PropType<DocSearchTranslations>,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.translations,
  },
  facetFilters: {
    type: [String, Array] as PropType<string | string[]>,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.facetFilters ?? [],
  },
  langAttribute: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.langAttribute ?? 'language',
  },
  // TODO: Maybe bind this with @nuxt/i18n ?
  lang: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.lang,
  },
  /**
   * Receives the items from the search response, and is called before displaying them.
   * Should return a new array with the same shape as the original array.
   * Useful for mapping over the items to transform, and remove or reorder them.
   *
   * {@link https://docsearch.algolia.com/docs/api#transformitems}
   */
  transformItems: {
    type: Function as PropType<DocSearchProps['transformItems']>,
    default: undefined,
  },
  /**
   * The component to display each item.
   *
   * {@link https://docsearch.algolia.com/docs/api#hitcomponent}
   * {@link https://github.com/algolia/docsearch/blob/next/packages/docsearch-react/src/Hit.tsx}
   */
  hitComponent: {
    type: [Function, undefined] as PropType<DocSearchProps['hitComponent'] | undefined>,
    default: undefined,
  },
  /**
   * Useful for transforming the Algolia Search Client, for example to debounce search queries.
   *
   * {@link https://docsearch.algolia.com/docs/api#transformsearchclient}
   */
  transformSearchClient: {
    type: [Function, undefined] as PropType<DocSearchProps['transformSearchClient']>,
    default: undefined,
  },
  /**
   * An implementation of Algolia Autocomplete’s Navigator API to redirect the user when opening a link.
   *
   * {@link https://docsearch.algolia.com/docs/api#navigator}
   */
  navigator: {
    type: [Object, undefined] as PropType<DocSearchProps['navigator']>,
    default: undefined,
  },
  /**
   * Function to return the URL of your documentation repository.
   * When provided, an informative message wrapped with your link will be displayed on no results searches.
   * The default text can be changed using the translations property.
   *
   * {@link https://docsearch.algolia.com/docs/api#getmissingresultsurl}
   */
  getMissingResultsUrl: {
    type: [Function, undefined] as PropType<DocSearchProps['getMissingResultsUrl'] | undefined>,
    default: undefined,
  },
})

/**
 * Check if event is special click to avoid closing the DocSearch too soon.
 */
const isSpecialClick = (event: MouseEvent) => event.button === 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey

/**
 * Gets the relative path from an absolute URL provided by the DocSearch instance.
 */
const getRelativePath = (absoluteUrl: string) => {
  // If URL is already relative, return it as is
  if (!absoluteUrl || absoluteUrl.startsWith('/')) {
    return withoutTrailingSlash(absoluteUrl)
  }

  try {
    // Try to parse as absolute URL
    const url = new URL(absoluteUrl)
    const relativeUrl = url.pathname + url.hash
    return withoutTrailingSlash(relativeUrl)
  }
  catch (error) {
    // If URL parsing fails, try to extract pathname manually
    // This handles cases where the URL might be malformed
    const hashIndex = absoluteUrl.indexOf('#')
    const hash = hashIndex !== -1 ? absoluteUrl.substring(hashIndex) : ''

    // Try to find the pathname part
    const originMatch = absoluteUrl.match(/^https?:\/\/[^/]+(\/.*?)(?:#|$)/)
    if (originMatch) {
      return withoutTrailingSlash(originMatch[1] + hash)
    }

    // If all else fails, return the original URL
    console.warn('Failed to parse URL:', absoluteUrl, error)
    return absoluteUrl
  }
}

/**
 * Removes [app.baseURL](https://nuxt.com/docs/api/composables/use-runtime-config#appbaseurl)
 * from the start of the given URL.
 */
const withoutBaseUrl = (url: string) => {
  const { app } = useRuntimeConfig()
  const routerBase = withoutTrailingSlash(app.baseURL)
  const hasBaseURL = routerBase !== '/'

  if (hasBaseURL && url.startsWith(routerBase)) {
    return url.substring(routerBase.length) || '/'
  }
  return url
}

type DocSearchFunc = (props: DocSearchProps & { container: HTMLElement | string }) => void

const importDocSearchAtRuntime = async (): Promise<DocSearchFunc> => {
  const imports = [import('@docsearch/js')]

  if (import.meta.client) {
    // @ts-expect-error - @docsearch/css is a CSS module without type declarations
    imports.push(import('@docsearch/css'))
  }

  const [docsearch] = await Promise.all(imports)

  return docsearch.default
}

/**
 * Initialize the DocSearch instance.
 */
const initialize = async () => {
  try {
    const docsearch = await importDocSearchAtRuntime()
    const langPrefix = props.lang ? `${props.langAttribute}:${props.lang}` : undefined
    const baseFacetFilters: string[] = Array.isArray(props.facetFilters)
      ? [...props.facetFilters]
      : props.facetFilters
        ? [props.facetFilters]
        : []
    const facetFilters: string[] = langPrefix ? [langPrefix, ...baseFacetFilters] : baseFacetFilters

    // Wait for next tick to ensure DOM is updated
    await nextTick()

    // Verify container exists - try multiple selectors to handle ID updates
    let container = document.querySelector(containerSelector.value)
    if (!container) {
      // Fallback: try to find by data attribute
      container = document.querySelector(`[data-docsearch-id="${containerId.value}"]`)
    }
    if (!container) {
      console.error(`DocSearch: Container ${containerSelector.value} not found`)
      return
    }

    // Ensure the container has the correct ID
    if (container.id !== containerId.value) {
      container.id = containerId.value
    }

    // Clean up previous instance if it exists
    if (docSearchInstance) {
      try {
        // DocSearch doesn't have a built-in destroy method, so we remove the modal if it exists
        const modal = document.querySelector('.DocSearch-Modal')
        if (modal) {
          modal.remove()
        }
        // Remove event listeners by removing and recreating the button
        const button = container.querySelector('.DocSearch-Button')
        if (button) {
          button.replaceWith(button.cloneNode(true))
        }
      }
      catch (error) {
        console.warn('DocSearch cleanup warning:', error)
      }
    }

    // Create DocSearch instance
    docSearchInstance = docsearch({
    /**
     * Local implementation of this DocSearch box uses a unique container ID for each instance.
     */
      container: containerSelector.value,
      appId: props.applicationId,
      apiKey: props.apiKey,
      indexName: props.indexName,
      searchParameters: {
        facetFilters,
        ...(props.searchParameters || {}),
      },
      /**
       * Transform items into relative URL format (compatibility with Vue Router).
       */
      transformItems: props.transformItems
        ? props.transformItems
        : (items) => {
            if (!items || !Array.isArray(items)) {
              console.warn('DocSearch transformItems: items is not an array', items)
              return []
            }

            return items.map((item) => {
              if (!item || !item.url) {
                console.warn('DocSearch transformItems: item missing url', item)
                return item
              }

              try {
                const transformedUrl = getRelativePath(item.url)
                return {
                  ...item,
                  url: transformedUrl,
                }
              }
              catch (error) {
                console.error('DocSearch transformItems error:', error, item)
                return item
              }
            })
          },
      navigator: props.navigator
        ? props.navigator
        : {
            navigate: ({ itemUrl }) => {
              const { pathname: hitPathname } = new URL(window.location.origin + itemUrl)
              // Vue Router doesn't handle same-page navigation so we use
              // the native browser location API for anchor navigation.
              if (route.path === hitPathname) {
                window.location.assign(window.location.origin + itemUrl)
              }
              else {
                router.push(withoutBaseUrl(itemUrl))
              }
            },
          },
      hitComponent: props.hitComponent
        ? props.hitComponent
        : ({ hit, children }) => {
            return {
              type: 'a',
              constructor: undefined,
              __v: 1,
              props: {
                href: hit.url,
                children,
                onClick: (event: MouseEvent) => {
                  if (isSpecialClick(event)) {
                    return
                  }

                  // We rely on the native link scrolling when user is
                  // already on the right anchor because Vue Router doesn't
                  // support duplicated history entries.
                  if (route.fullPath === hit.url) {
                    return
                  }

                  const { pathname: hitPathname } = new URL(window.location.origin + hit.url)

                  // If the hits goes to another page, we prevent the native link behavior
                  // to leverage the Vue Router loading feature.
                  if (route.path !== hitPathname) {
                    event.preventDefault()
                  }

                  router.push(withoutBaseUrl(hit.url))
                },
              },
            }
          },
      disableUserPersonalization: props.disableUserPersonalization,
      getMissingResultsUrl: props.getMissingResultsUrl,
      initialQuery: props.initialQuery,
      placeholder: props.placeholder,
      translations: props.translations,
      transformSearchClient: props.transformSearchClient,
    })
  }
  catch (error) {
    console.error('DocSearch initialization error:', error)
  }
}

// Cleanup on unmount
onUnmounted(() => {
  if (docSearchInstance) {
    try {
      const modal = document.querySelector('.DocSearch-Modal')
      if (modal) {
        modal.remove()
      }
    }
    catch (error) {
      console.warn('DocSearch cleanup warning:', error)
    }
    docSearchInstance = null
  }
})

onMounted(async () => {
  // Generate unique ID on client mount to avoid SSR mismatch
  // This ensures each instance has a unique ID while avoiding hydration issues
  if (containerId.value === 'docsearch') {
    const uuid = generateUUID()
    const newId = `docsearch-${uuid.substring(0, 8)}`

    // Update the ref first
    containerId.value = newId

    // Then update the DOM element ID directly to ensure it's set before DocSearch initialization
    await nextTick()
    const element = document.querySelector('#docsearch')
    if (element) {
      element.id = newId
    }
  }

  // Wait for DOM to be fully updated
  await nextTick()
  await initialize()
})

if (import.meta.client) {
  watch(props, async () => {
    await initialize()
  })
}
</script>
