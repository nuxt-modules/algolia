import { RestApi } from '../api/rest-api'
import { BigCommerceConfigOptions } from '../types'

export class PaymentApi {
  private _restApi: RestApi
  private _config: BigCommerceConfigOptions | null

  constructor (restApi: RestApi, config?: BigCommerceConfigOptions) {
    this._restApi = restApi
    this._config = config || null
  }

  public async getMethodByOrderId (orderId: number) {
    return await this._restApi.sendRequest({ method: 'GET', endpoint: `/v3/payments/methods?order_id=${orderId}` })
  };

  // TODO: add typing for paymentData
  public async processOrder (orderId: number, paymentData: any) {
    if (!this._config?.apiToken) {
      return await this._restApi.sendRequest({ method: 'POST', endpoint: '/proxy/payments', body: { orderId, paymentData } })
    } else {
      const tokenResult = await this._restApi.sendRequest({ method: 'POST', endpoint: '/v3/payments/access_tokens', body: { order: { id: orderId } } })

      return await this._restApi.sendPaymentRequest({ method: 'POST', endpoint: `${this._config?.storeHash || 'proxy'}/payments`, body: paymentData, auth: tokenResult.data?.data?.id })
    }
  };
}
