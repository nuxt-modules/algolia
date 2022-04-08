import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: [
    'defu',
    '@algolia/autocomplete-core',
    '@docsearch/js',
    '@docsearch/css',
    '@docsearch/react'
  ]
})
