import { GraphqlApi } from '../api/graphql-api'
import { categoryFragment } from '../utils/fragments'
import { CustomQuery } from '../types'

export class CategoryApi {
  private _graphqApi: GraphqlApi

  constructor (graphqApi: GraphqlApi) {
    this._graphqApi = graphqApi
  }

  public async getAll (customQuery?: CustomQuery) {
    const graphQLQuery = customQuery || `
        query CategoryQuery {
          site {
            categoryTree {
              ...CategoryFields
              children {
                ...CategoryFields
                children {
                  ...CategoryFields
                }
              }
            }
          }
        }
        ${categoryFragment}
        `
    return await this._graphqApi.sendQuery(graphQLQuery)
  }

  public async getAllByIds (ids: any, customQuery?: CustomQuery) {
    const graphQLQuery = customQuery || `
    query CategoryTree3LevelsDeep {
      site {
        categoryTree {
          ...CategoryFields
          children {
            ...CategoryFields
            children {
              ...CategoryFields
            }
          }
        }
      }
    }
    ${categoryFragment}`

    const response = await this._graphqApi.sendQuery(graphQLQuery)
    // eslint-disable-next-line
    const categories = response?.data?.site?.categoryTree?.filter((c: any) => ids.includes(c.entityId))
    return categories
  }

  public async getPath (id: any, customQuery?: CustomQuery) {
    const graphQLQuery = customQuery || `
    query CategoryTree3LevelsDeep {
      site {
        categoryTree {
          ...CategoryFields
          children {
            ...CategoryFields
            children {
              ...CategoryFields
            }
          }
        }
      }
    }
    ${categoryFragment}`

    try {
      const response = await this._graphqApi.sendQuery(graphQLQuery)
      const categories = response.site.categoryTree
      // eslint-disable-next-line
      const categoryPath = categories.filter((c: any) => c.entityId === id)
      return categoryPath ? categoryPath[0].path : false
    } catch (e) {
      console.error(e)
    }
  }

  public async getProductCount (customQuery?: CustomQuery) {
    const graphQLQuery = customQuery || `
          query ProductCount {
            site {
              categoryTree {
                ... on CategoryTreeItem {
                  name
                  productCount
                }
              }
            }
          }
          `

    return await this._graphqApi.sendQuery(graphQLQuery)
  }
}
