import axios from 'axios'
import { BigCommerceConfigOptions } from '../types'

export class GraphqlApi {
  private _config: BigCommerceConfigOptions | null

  constructor (config?: BigCommerceConfigOptions) {
    this._config = config || null
  }

  async sendQuery (query: string, cookie?: any) {
    let graphQLUrl: string
    if (this._config?.storeUrl) {
      const url = new URL(this._config.storeUrl)
      graphQLUrl = `${url.origin}/graphql`
    } else {
      graphQLUrl = '/graphql'
    }

    try {
      const response = await axios(graphQLUrl, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._config?.storefrontToken || ''}`
        },
        data: JSON.stringify({
          query
        })
      })

      response.headers['set-cookie'] = cookie || 'proxy'
      return response.data
    } catch (err: any) {
      return err;
    }
  }
}
