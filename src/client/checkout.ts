import { RestApi } from '../api/rest-api'

export class CheckoutApi {
  private _restApi: RestApi

  constructor (restApi: RestApi) {
    this._restApi = restApi
  }

  public async createOrder (checkoutId: number) {
    return await this._restApi.sendRequest({ method: 'POST', endpoint: `/v3/checkouts/${checkoutId}/orders` })
  }

  public async getById (checkoutId: number) {
    return await this._restApi.sendRequest({ method: 'GET', endpoint: `/v3/checkouts/${checkoutId}?includes=consignments.available_shipping_options` })
  }

  // eslint-disable-next-line
  public async setConsignment(checkoutId: number, consignment: any) {
    return await this._restApi.sendRequest({ method: 'POST', endpoint: `/v3/checkouts/${checkoutId}/consignments`, body: consignment })
  }

  public async updateConsignment (checkoutId: number, consignmentId: number, consignment: any) {
    return await this._restApi.sendRequest({ method: 'PUT', endpoint: `/v3/checkouts/${checkoutId}/consignments/${consignmentId}`, body: consignment })
  }

  public async updateShippingOption (checkoutId: number, consignmentId: number, shippingOptionId: number) {
    return await this._restApi.sendRequest({ method: 'PUT', endpoint: `/v3/checkouts/${checkoutId}/consignments/${consignmentId}`, body: { shipping_option_id: shippingOptionId } })
  }

  // eslint-disable-next-line
  public async setBillingAddress(checkoutId: number, billingData: any) {
    return await this._restApi.sendRequest({ method: 'POST', endpoint: `/v3/checkouts/${checkoutId}/billing-address`, body: billingData })
  }

  public async addCoupons (checkoutId: number, couponCode: string) {
    return await this._restApi.sendRequest({ method: 'GET', endpoint: `/v3/checkouts/${checkoutId}/coupons`, body: { coupon_code: couponCode } })
  }
}
