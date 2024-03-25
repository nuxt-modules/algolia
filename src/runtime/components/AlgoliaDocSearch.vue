<template>
  <div id="docsearch">
    <button type="button" class="DocSearch DocSearch-Button" aria-label="Search" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { withoutTrailingSlash } from 'ufo'
import type { DocSearchTranslations, DocSearchProps } from '@docsearch/react'
import type { HitComponentFunc, ModuleBaseOptions, SearchOptions } from '../../types'
// @ts-ignore - These are Nuxt3 aliases
import { useRuntimeConfig, useRoute, useRouter, onMounted, watch } from '#imports'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  applicationId: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.applicationId
  },
  apiKey: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.apiKey
  },
  indexName: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.indexName
  },
  placeholder: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.placeholder
  },
  searchParameters: {
    type: Object as PropType<SearchOptions>,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.searchParameters
  },
  disableUserPersonalization: {
    type: Boolean,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.disableUserPersonalization
  },
  initialQuery: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.initialQuery
  },
  translations: {
    type: Object as PropType<DocSearchTranslations>,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.translations
  },
  facetFilters: {
    type: [String, Array] as PropType<string | string[]>,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.facetFilters ?? []
  },
  langAttribute: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.langAttribute ?? 'language'
  },
  // TODO: Maybe bind this with @nuxt/i18n ?
  lang: {
    type: String,
    default: () => (useRuntimeConfig().public.algolia as ModuleBaseOptions)?.docSearch?.lang
  },
  /**
   * Receives the items from the search response, and is called before displaying them.
   * Should return a new array with the same shape as the original array.
   * Useful for mapping over the items to transform, and remove or reorder them.
   *
   * {@link https://docsearch.algolia.com/docs/api#transformitems}
   */
  transformItems: {
    type: Function as PropType<DocSearchProps['transformItems'] | undefined>,
    default: undefined
  },
  /**
   * The component to display each item.
   *
   * {@link https://docsearch.algolia.com/docs/api#hitcomponent}
   * {@link https://github.com/algolia/docsearch/blob/next/packages/docsearch-react/src/Hit.tsx}
   */
  hitComponent: {
    type: [Function, undefined] as PropType<HitComponentFunc | undefined>,
    default: undefined
  },
  /**
   * Useful for transforming the Algolia Search Client, for example to debounce search queries.
   *
   * {@link https://docsearch.algolia.com/docs/api#transformsearchclient}
   */
  transformSearchClient: {
    type: [Function, undefined] as PropType<DocSearchProps['transformSearchClient'] | undefined>,
    default: undefined
  },
  /**
   * An implementation of Algolia Autocomplete’s Navigator API to redirect the user when opening a link.
   *
   * {@link https://docsearch.algolia.com/docs/api#navigator}
   */
  navigator: {
    type: [Object, undefined] as PropType<DocSearchProps['navigator'] | undefined>,
    default: undefined
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
    default: undefined
  }
})

/**
 * Check if event is special click to avoid closing the DocSearch too soon.
 */
const isSpecialClick = (event: MouseEvent) => event.button === 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey

/**
 * Gets the relative path from an absolute URL provided by the DocSearch instance.
 */
const getRelativePath = (absoluteUrl: string) => {
  const { pathname, hash } = new URL(absoluteUrl)
  const url = window.location.origin
  const relativeUrl = pathname.replace(url, '/') + hash
  return withoutTrailingSlash(relativeUrl)
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

type DocSearchFunc = (props: DocSearchProps & {container: HTMLElement | string}) => void

const importDocSearchAtRuntime = async (): Promise<DocSearchFunc> => {
  const [docsearch] = await Promise.all([
    // @ts-ignore
    import(/* webpackChunkName: "docsearch" */ '@docsearch/js'),
    // @ts-ignore
    import.meta.client && import(/* webpackChunkName: "docsearch" */ '@docsearch/css')
  ])

  return docsearch.default
}

/**
 * Initialize the DocSearch instance.
 */
const initialize = async () => {
  const docsearch = await importDocSearchAtRuntime()
  const langPrefix = props.lang ? `${props.langAttribute}:${props.lang}` : undefined
  const facetFilters = langPrefix ? [langPrefix, ...props.facetFilters] : props.facetFilters

  // Create DocSearch instance
  docsearch({
    /**
     * Local implementation of this DocSearch box uses a local element with an `docsearch` id.
     */
    container: '#docsearch',
    appId: props.applicationId,
    apiKey: props.apiKey,
    indexName: props.indexName,
    searchParameters: {
      facetFilters,
      ...props.searchParameters
    },
    /**
     * Transform items into relative URL format (compatibility with Vue Router).
     */
    transformItems: props.transformItems
      ? props.transformItems
      : (items) => {
          return items.map((item) => {
            return {
              ...item,
              url: getRelativePath(item.url)
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
            } else {
              router.push(withoutBaseUrl(itemUrl))
            }
          }
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
                if (isSpecialClick(event)) { return }

                // We rely on the native link scrolling when user is
                // already on the right anchor because Vue Router doesn't
                // support duplicated history entries.
                if (route.fullPath === hit.url) { return }

                const { pathname: hitPathname } = new URL(window.location.origin + hit.url)

                // If the hits goes to another page, we prevent the native link behavior
                // to leverage the Vue Router loading feature.
                if (route.path !== hitPathname) { event.preventDefault() }

                router.push(withoutBaseUrl(hit.url))
              }
            }
          } as any
        },
    disableUserPersonalization: props.disableUserPersonalization,
    getMissingResultsUrl: props.getMissingResultsUrl,
    initialQuery: props.initialQuery,
    placeholder: props.placeholder,
    translations: props.translations,
    transformSearchClient: props.transformSearchClient
  })
}

onMounted(async () => {
  await initialize()
})

if (import.meta.client) {
  watch(props, async () => {
    await initialize()
  })
}
</script>
