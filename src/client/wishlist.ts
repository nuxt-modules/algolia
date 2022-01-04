import { RestApi } from '../api/rest-api'
import { WishlistData } from '../types'

export class WishlistApi {
  private _restApi: RestApi

  constructor (restApi: RestApi) {
    this._restApi = restApi
  }

  public async getById (wishlistId: number) {
    return await this._restApi.sendRequest({ method: 'GET', endpoint: `/v3/wishlists/${wishlistId}` })
  }

  public async create (wishlistData: WishlistData) {
    return await this._restApi.sendRequest({ method: 'POST', endpoint: '/v3/wishlists', body: wishlistData })
  }

  public async addItem (wishlistId: number, item: any) {
    return await this._restApi.sendRequest({ method: 'POST', endpoint: `/v3/wishlists/${wishlistId}`, body: item })
  }

  public async deleteItem (wishlistId: number, wishlistItemId: number) {
    return await this._restApi.sendRequest({ method: 'DELETE', endpoint: `/v3/wishlists/${wishlistId}/items/${wishlistItemId}` })
  }
}
