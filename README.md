[![@nuxt-moedules/algolia](https://algolia-nm.netlify.app/preview.png)](https://algolia-nm.netlify.app)

# @nuxt-modules/algolia

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Algolia](https://www.algolia.com/) module for [Nuxt 3](https://v3.nuxtjs.org)

- [✨ &nbsp;Release Notes](https://github.com/nuxt-modules/algolia/releases)
- [📖 &nbsp;Read the documentation](https://algolia-nm.netlify.app)

## Features

- Nuxt 3 ready
- Easy integration with Algolia
- Handy composables like useAlgolia, useSearch, etc
- TypeScript support

[📖 &nbsp;Read the documentation](https://algolia-nm.netlify.app)

## Setup

```sh
yarn add @nuxt-modules/algolia # yarn
npm i @nuxt-modules/algolia # npm
```

## Basic usage

Firstly, you need to add `@nuxt-modules/algolia` to your Nuxt config.

```javascript
// nuxt.config.js

{
  modules: [
    [
      '@nuxt-modules/algolia',
      {
        apiKey: '<YOUR_SEARCH_API_KEY>',
        applicationId: '<YOUR_APPLICATION_ID>'
      }
    ]
  ]
}
```

Then you can start using `@nuxt-modules/algolia` in your setup function!

```vue
<script setup>
const { result, search } = useSearch('test_index') // pass your index as param

onMounted(async () => {
  await search({ query: 'Samsung' });
})
</script>
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxt-modules/algolia/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxt-modules/algolia

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxt-modules/algolia.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxt-modules/algolia

[github-actions-ci-src]: https://github.com/nuxt-modules/algolia/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-modules/algolia/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-modules/algolia.svg
[codecov-href]: https://codecov.io/gh/nuxt-modules/algolia

[license-src]: https://img.shields.io/npm/l/@nuxt-modules/algolia.svg
[license-href]: https://npmjs.com/package/@nuxt-modules/algolia
