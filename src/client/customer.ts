import { GraphqlApi } from '../api/graphql-api'
import { RestApi } from '../api/rest-api'
import { BigCommerceConfigOptions, CustomQuery } from '../types'

export class CustomerApi {
  private _restApi: RestApi
  private _graphqlApi: GraphqlApi
  private _config: BigCommerceConfigOptions | null

  constructor (restApi: RestApi, graphqlApi: GraphqlApi, config?: BigCommerceConfigOptions) {
    this._restApi = restApi
    this._graphqlApi = graphqlApi
    this._config = config || null
  }

  public async get (cookie: any, customQuery?: CustomQuery) {
    const graphQLQuery = customQuery || `
      query {
        customer {
          firstName
          lastName
          email
          id: entityId
          groupId: customerGroupId
          company
          notes
          phone
          taxExemptCategory
          addressCount
          attributeCount
          storeCredit {
            currencyCode
            value
          }
        }
      }
    `
    return await this._graphqlApi.sendQuery(graphQLQuery, cookie)
  }

  public async getOrders (customerId: number) {
    return await this._restApi.sendRequest({ method: 'GET', endpoint: `/v2/orders?customer_id=${customerId}&channel_id=${this._config?.channelId}` })
  }

  public async getAddresses (customerId: number) {
    return await this._restApi.sendRequest({ method: 'GET', endpoint: `/v2/customers/${customerId}/addresses` })
  }

  // eslint-disable-next-line
  public async updateAddress(customerId: number, addressId: number, address: any) {
    return await this._restApi.sendRequest({ method: 'PUT', endpoint: `/v2/customers/${customerId}/addresses/${addressId}`, body: address })
  }

  public async addAddress (customerId: number, address: any) {
    return await this._restApi.sendRequest({ method: 'POST', endpoint: `/v2/customers/${customerId}/addresses`, body: address })
  }

  public async deleteAddress (customerId: number, addressId: number) {
    return await this._restApi.sendRequest({ method: 'DELETE', endpoint: `/v2/customers/${customerId}/addresses/${addressId}` })
  }
}
