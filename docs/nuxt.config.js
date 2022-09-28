import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  extends: ['./node_modules/@docus/docs-theme'],

  modules: ['@docus/github'],

  github: {
    owner: 'nuxt-modules',
    repo: 'algolia',
    branch: 'main'
  },

  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: '#5468FF',
              50: '#FFFFFF',
              100: '#F7F8FF',
              200: '#CED4FF',
              300: '#A6B0FF',
              400: '#7D8CFF',
              500: '#5468FF',
              600: '#1C36FF',
              700: '#001BE3',
              800: '#0014AB',
              900: '#000D73'
            }
          }
        }
      }
    }
  }
})
