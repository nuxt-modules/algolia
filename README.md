[![@nuxt-commerce/algolia](https://algolia-nc.netlify.app/preview.png)](https://algolia.nuxt-commerce.vercel.app)

# @nuxt-commerce/algolia

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Algolia](https://www.algolia.com/) module for [Nuxt 3](https://v3.nuxtjs.org)

- [✨ &nbsp;Release Notes](https://github.com/nuxt-commerce/algolia/releases)
- [📖 &nbsp;Read the documentation](https://algolia-nc.netlify.app)

## Features

- Nuxt 3 ready
- Easy integration with Algolia
- Handy composables like useAlgolia, useSearch, etc
- TypeScript support

[📖 &nbsp;Read the documentation](https://algolia-nc.netlify.app)

## Setup
```sh
yarn add @nuxt-commerce/algolia # yarn
npm i @nuxt-commerce/algolia # npm
```

## Basic usage
Firstly, you need to add `@nuxt-commerce/algolia` to your Nuxt config.

```javascript
// nuxt.config.js

{
  modules: [
    [
      '@nuxt-commerce/algolia',
      {
        apiKey: '123',
        applicationId: '123'
      }
    ]
  ]
}
```

Then you can start using `@nuxt-commerce/algolia` in your setup function!

```js
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
[npm-version-src]: https://img.shields.io/npm/v/@nuxt-commerce/algolia/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxt-commerce/algolia

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxt-commerce/algolia.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxt-commerce/algolia

[github-actions-ci-src]: https://github.com/nuxt-commerce/algolia/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-commerce/algolia/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-commerce/algolia.svg
[codecov-href]: https://codecov.io/gh/nuxt-commerce/algolia

[license-src]: https://img.shields.io/npm/l/@nuxt-commerce/algolia.svg
[license-href]: https://npmjs.com/package/@nuxt-commerce/algolia
