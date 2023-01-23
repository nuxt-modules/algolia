[![@nuxtjs/algolia](https://algolia.nuxtjs.org/preview.png)](https://algolia.nuxtjs.org)

# @nuxtjs/algolia

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Algolia](https://www.algolia.com/) module for [Nuxt](https://v3.nuxtjs.org)

- [✨ &nbsp;Release Notes](https://github.com/nuxt-modules/algolia/releases)
- [📖 &nbsp;Read the documentation](https://algolia.nuxtjs.org)

## Features

- Easy integration with Algolia
- Handy composables like useAlgoliaSearch, useAsyncAlgoliaSearch
- Support for Vue Instantsearch components
- Support for Algolia Recommend
- Support for Docsearch
- Support for Automatic Indexing
- Support for caching the requests and responses
- Support for SSR requests

[📖 &nbsp;Read the documentation](https://algolia.nuxtjs.org)

## Preview

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/github-epeint?file=app.vue)

## Setup

```sh
yarn add @nuxtjs/algolia # yarn
npm i @nuxtjs/algolia # npm
```

## Basic usage

Firstly, you need to add `@nuxtjs/algolia` to your Nuxt config.

```js
export default defineNuxtConfig({
  modules: ['@nuxtjs/algolia']
})
```

Furthermore, add `ALGOLIA_API_KEY` and `ALGOLIA_APPLICATION_ID` environment variables to .env file.

```env
ALGOLIA_API_KEY="0fd1c4eba2d831788333e77c9d855f1d"
ALGOLIA_APPLICATION_ID="AGN9HEEKF3"
```

Now you can start using `@nuxtjs/algolia` in your app!

Client side:

```vue
<script setup lang="ts">
const { result, search } = useAlgoliaSearch('test_index')

onMounted(async () => {
  await search({ query: 'Samsung' })
})
</script>

<template>
  <div>{{ result }}</div>
</template>
```

Or SSR:

```vue
<script setup lang="ts">
const { data } = await useAsyncAlgoliaSearch({ indexName: 'test_index', query: 'Samsung' })
</script>

<template>
  <div>{{ data }}</div>
</template>
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/algolia/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/algolia
[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/algolia.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/algolia
[github-actions-ci-src]: https://github.com/nuxt-modules/algolia/actions/workflows/ci.yml/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-modules/algolia/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-modules/algolia.svg
[codecov-href]: https://codecov.io/gh/nuxt-modules/algolia
[license-src]: https://img.shields.io/npm/l/@nuxtjs/algolia.svg
[license-href]: https://npmjs.com/package/@nuxtjs/algolia
