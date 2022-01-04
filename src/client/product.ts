import { GraphqlApi } from '../api/graphql-api'
import { productFragment } from '../utils/fragments'
import { CustomQuery } from '../types'
import { CategoryApi } from './category'

export class ProductApi {
  private _graphqApi: GraphqlApi
  private _category: CategoryApi

  constructor (graphqApi: GraphqlApi, category: CategoryApi) {
    this._graphqApi = graphqApi
    this._category = category
  }

  public async getById (id: number, customQuery?: CustomQuery) {
    const graphQLQuery =
      customQuery ||
      `
      query ProductId {
        site {
          product${id ? `(entityId:${id})` : ''} {
            ...ProductFields
          }
        }
      }
      ${productFragment}`

    return await this._graphqApi.sendQuery(graphQLQuery)
  }

  public async getAll ({ perPage = 50, cursor = 'test', direction = 'after' }, customQuery?: CustomQuery) {
    let cursorString = ''
    let dir = 'first'

    if (cursor && cursor.length) {
      cursorString = `, ${direction}: "${cursor}"`
      if (direction === 'before') { dir = 'last' }
    }
    const graphQLQuery = customQuery || `
          query AllProducts {
            site {
              products(${dir}: ${perPage}${cursorString}) {
                pageInfo {
                  startCursor
                  endCursor
                }
                edges {
                  node {
                    ...ProductFields
                  }
                }
              }
            }
          }
          ${productFragment}
          `
    return await this._graphqApi.sendQuery(graphQLQuery)
  }

  public async getAllByIds ({ perPage = 50, cursor = 'test', direction = 'after', ids = [] }, customQuery?: CustomQuery) {
    let cursorString = ''
    let dir = 'first'
    const stringIds = ids ? ids.join(',') : ''

    if (cursor && cursor.length) {
      if (direction === 'before') { dir = 'last' }
      cursorString = `, ${direction}: "${cursor}"`
    }

    const graphQLQuery = customQuery || `
      query ProductsById {
        site {
          products(entityIds: [${stringIds}], ${dir}: ${perPage}${cursorString}) {
            pageInfo {
              startCursor
              endCursor
            }
            edges {
              node {
                ...ProductFields
              }
            }
          }
        }
      }
      ${productFragment}
      `

    return await this._graphqApi.sendQuery(graphQLQuery)
  }

  public async getBySlug (slug: string, customQuery?: CustomQuery) {
    const graphQLQuery = customQuery || `
    query ProductSlug {
      site {
        route${slug ? `(path:"${slug}")` : ''} {
          node {
            id
            ...ProductFields
          }
        }
      }
    }
    ${productFragment}`

    return await this._graphqApi.sendQuery(graphQLQuery)
  }

  public async getAllByPath (path: string, customQuery?: CustomQuery) {
    const correctPath =
      path.startsWith('/') && path.endsWith('/') ? path : `/${path}/`
    const graphQLQuery = customQuery || `
            query ProductPath {
              site {
                route${path ? `(path:"${correctPath}")` : ''} {
                  node {
                    ... on Category {
                      name
                      path
                      products {
                        edges {
                          node {
                            ...ProductFields
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ${productFragment}
            `

    return await this._graphqApi.sendQuery(graphQLQuery)
  }

  // eslint-disable-next-line
  public async getAllByCategory(categoryId: any, customQuery?: CustomQuery) {
    const categoryPath = await this._category.getPath(categoryId)

    return customQuery ? await this._graphqApi.sendQuery(customQuery) : await this.getAllByPath(categoryPath)
  }
}
