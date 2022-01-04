import { RestApi } from '../api/rest-api'
import { CreateCartData } from '../types'

export class CartApi {
  private _restApi: RestApi

  constructor (restApi: RestApi) {
    this._restApi = restApi
  }

  public async getById (cartId: number) {
    return await this._restApi.sendRequest({ method: 'GET', endpoint: `/v3/carts/${cartId}?include=redirect_urls,line_items.physical_items.options` })
  };

  public async create (cartData: CreateCartData) {
    return await this._restApi.sendRequest({ method: 'POST', endpoint: '/v3/carts?include=redirect_urls', body: cartData })
  };

  public async addItem (cartId: number, cartData: any) {
    return await this._restApi.sendRequest({ method: 'POST', endpoint: `/v3/carts/${cartId}/items?include=redirect_urls`, body: cartData })
  };

  public async updateItem (cartId: number, cartData: any, itemId: number) {
    return await this._restApi.sendRequest({ method: 'PUT', endpoint: `/v3/carts/${cartId}/items/${itemId}?include=redirect_urls`, body: cartData })
  };

  public async deleteItem (cartId: number, itemId: number) {
    return await this._restApi.sendRequest({ method: 'DELETE', endpoint: `/v3/carts/${cartId}/items/${itemId}?include=redirect_urls` })
  };

  public async updateWithCustomerId (cartId: number, customerId: number) {
    return await this._restApi.sendRequest({ method: 'PUT', endpoint: `/v3/carts/${cartId}`, body: { customer_id: customerId } })
  };
}
