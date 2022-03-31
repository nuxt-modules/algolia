<template>
  <div id="docsearch">
    <button type="button" class="DocSearch DocSearch-Button justify-end" aria-label="Search">
      <svg width="20" height="20" class="d-icon m-auto" viewBox="0 0 20 20">
        <path
          d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
          stroke="currentColor"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from '#imports'

const route = useRoute()

const router = useRouter()

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})

const isSpecialClick = event => event.button === 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey

const stripTrailingSlash = url => url.replace(/\/$|\/(?=\?)|\/(?=#)/g, '')

const getRelativePath = (absoluteUrl) => {
  const { pathname, hash } = new URL(absoluteUrl)
  const url = pathname.replace('https://v3.nuxtjs.org', '/') + hash
  return stripTrailingSlash(url)
}

const initialize = async (userOptions: any, code: string) => {
  const lang = code || 'en-US'

  const docsearch = await Promise.all([
    // @ts-ignore
    import(/* webpackChunkName: "docsearch" */ '@docsearch/js'),
    // @ts-ignore
    import(/* webpackChunkName: "docsearch" */ '@docsearch/css')
  ]).then(([docsearch]) => docsearch.default)

  // Create DocSearch instance
  docsearch({
    ...userOptions,
    container: '#docsearch',
    searchParameters: {
      ...((!lang)
        ? {}
        : {
            facetFilters: [`${userOptions.langAttribute || 'language'}:${lang}`].concat(
              userOptions.facetFilters || []
            )
          })
    },
    navigator: {
      navigate: ({ itemUrl }) => {
        const { pathname: hitPathname } = new URL(window.location.origin + itemUrl)
        // Vue Router doesn't handle same-page navigation so we use
        // the native browser location API for anchor navigation.
        if (route.path === hitPathname) {
          window.location.assign(window.location.origin + itemUrl)
        } else {
          router.push(itemUrl)
        }
      }
    },
    transformItems: (items) => {
      return items.map((item) => {
        return {
          ...item,
          url: getRelativePath(item.url)
        }
      })
    },
    hitComponent: ({ hit, children }) => {
      return {
        type: 'a',
        constructor: undefined,
        __v: 1,
        props: {
          href: hit.url,
          children,
          onClick: (event) => {
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
            router.push(hit.url)
          }
        }
      }
    }
  })
}

onMounted(() => initialize(props.options, 'en-US'))

watch(() => props.options, (newValue: any) => initialize(newValue, 'en-US'))
</script>
