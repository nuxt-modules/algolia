import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { loadNuxt } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'

describe('module', () => {
  let nuxt: Nuxt

  beforeAll(async () => {
    nuxt = await loadNuxt({
      cwd: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
      dev: false
    })
  }, 60_000)

  afterAll(async () => {
    await nuxt?.close()
  })

  it('does not copy private runtime config into public runtime config', () => {
    expect(nuxt.options.runtimeConfig.public.algolia).not.toHaveProperty('adminApiKey')
  })

  it('merges existing public runtime config with module options', () => {
    expect(nuxt.options.runtimeConfig.public.algolia).toMatchObject({
      applicationId: 'app-id',
      apiKey: 'search-key',
      globalIndex: 'public-index'
    })
  })
})
