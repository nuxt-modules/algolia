export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-og-image',
    'nuxt-studio',
  ],

  // Usa il connettore SQLite nativo di Node.js invece di better-sqlite3
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  compatibilityDate: '2026-01-24',

})
