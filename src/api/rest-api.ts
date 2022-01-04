import axios from 'axios'
import { PAYMENT_URL, REST_API_URL } from '../utils/constants'
import { BigCommerceConfigOptions, SendRequest } from '../types'

export class RestApi {
  private _config: BigCommerceConfigOptions | null

  constructor (config?: BigCommerceConfigOptions) {
    this._config = config || null
  }

  async sendRequest ({ method, endpoint, body, cookie }: SendRequest) {
    let restApiUrl: string
    if (this._config?.storeUrl) {
      const url = new URL(REST_API_URL)
      restApiUrl = `${url.origin}/stores/${this._config.storeHash}${endpoint}`
    } else {
      restApiUrl = endpoint
    }

    try {
      const response = await axios(restApiUrl, {
        method,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': this._config?.apiToken || ''
        },
        data: body
      })
      response.headers['set-cookie'] = cookie || 'proxy'

      return response.data
    } catch (err: any) {
      return err
    }
  }

  async sendPaymentRequest ({ method, endpoint, body, cookie, auth }: SendRequest) {
    let restApiUrl: string
    if (this._config?.storeUrl) {
      const url = new URL(PAYMENT_URL)
      restApiUrl = `${url.origin}/stores/${this._config.storeHash}${endpoint}`
    } else {
      restApiUrl = endpoint
    }

    try {
      const response = await axios(restApiUrl, {
        method,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `PAT ${auth}`,
          Accept: 'application/vnd.bc.v1+json'
        },
        data: body
      })

      response.headers['set-cookie'] = cookie || 'proxy'

      return response.data
    } catch (err: any) {
      return err;
    }
  }
}
