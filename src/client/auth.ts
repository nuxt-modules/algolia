import { GraphqlApi } from '../api/graphql-api'
import { RestApi } from '../api/rest-api'
import { Credentials, CustomQuery, RegisterData } from '../types'
import { CustomerApi } from './customer'

export class AuthApi {
  private _restApi: RestApi
  private _graphqlApi: GraphqlApi
  private _customer: CustomerApi

  constructor (restApi: RestApi, graphqlApi: GraphqlApi, customerApi: CustomerApi) {
    this._graphqlApi = graphqlApi
    this._restApi = restApi
    this._customer = customerApi
  }

  public async login (credentials: Credentials, customQuery?: CustomQuery) {
    const graphQLQuery = customQuery || `
    mutation Login {
      login(email: "${credentials.email}", password: "${credentials.password}") {
        result
      }
    }
    `
    const loginResponse = await this._graphqlApi.sendQuery(graphQLQuery)

    // TODO: check the response structure to find the cookie
    return await this._customer.get(loginResponse.cookie)
  };

  public async register (registerData: RegisterData) {
    return await this._restApi.sendRequest({ method: 'POST', endpoint: '/v3/customers', body: registerData })
  };

  public async logout (cookie: any, customQuery?: CustomQuery) {
    const graphQLQuery = customQuery || `
      mutation Logout {
        logout {
          result
        }
      }
    `

    return await this._graphqlApi.sendQuery(graphQLQuery, cookie)
  };
}
