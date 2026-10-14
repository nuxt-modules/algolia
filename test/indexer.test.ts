import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, toWebHandler } from 'h3'

const config = vi.hoisted(() => ({
  public: { algolia: { applicationId: 'app-id' } },
  algoliaIndexer: { storyblok: {} as Record<string, unknown> }
}))

const indexer = vi.hoisted(() => vi.fn())

vi.mock('#imports', () => ({ useRuntimeConfig: () => config }))
vi.mock('storyblok-algolia-indexer', () => ({ default: indexer }))

const { default: handler } = await import('../src/runtime/server/api/storyblok')

const app = createApp().use('/api/indexer', handler)
const request = toWebHandler(app)

describe('storyblok indexer', () => {
  beforeEach(() => {
    indexer.mockClear()
    config.algoliaIndexer.storyblok = {
      secret: 'indexer-secret',
      algoliaAdminApiKey: 'admin-key',
      indexName: 'index',
      accessToken: 'token'
    }
  })

  it('rejects requests when no secret is configured', async () => {
    config.algoliaIndexer.storyblok.secret = undefined

    for (const url of ['/api/indexer', '/api/indexer?secret=']) {
      const res = await request(new Request(`http://localhost${url}`))
      expect(res.status).toBe(401)
    }
    expect(indexer).not.toHaveBeenCalled()
  })

  it('rejects requests without a matching secret', async () => {
    for (const url of ['/api/indexer', '/api/indexer?secret=', '/api/indexer?secret=wrong', '/api/indexer?secret=indexer-secret-']) {
      const res = await request(new Request(`http://localhost${url}`))
      expect(res.status).toBe(401)
    }
    const res = await request(new Request('http://localhost/api/indexer', { headers: { authorization: 'Bearer wrong' } }))
    expect(res.status).toBe(401)
    expect(indexer).not.toHaveBeenCalled()
  })

  it('runs the indexer with a matching secret in the query', async () => {
    const res = await request(new Request('http://localhost/api/indexer?secret=indexer-secret'))
    expect(res.status).toBe(200)
    expect(indexer).toHaveBeenCalledOnce()
  })

  it('runs the indexer with a matching bearer token', async () => {
    const res = await request(new Request('http://localhost/api/indexer', { method: 'POST', headers: { authorization: 'bearer indexer-secret' } }))
    expect(res.status).toBe(200)
    expect(indexer).toHaveBeenCalledOnce()
  })
})
