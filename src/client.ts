import { GraphqlApi } from './api/graphql-api'
import { RestApi } from './api/rest-api'
import { AuthApi } from './client/auth'
import { CartApi } from './client/cart'
import { CategoryApi } from './client/category'
import { CheckoutApi } from './client/checkout'
import { CustomerApi } from './client/customer'
import { PaymentApi } from './client/payment'
import { ProductApi } from './client/product'
import { WishlistApi } from './client/wishlist'
import { BigCommerceConfigOptions, CustomQuery } from './types'

export class BigCommerceClientApi {
  private graphqlApi: GraphqlApi
  private restApi: RestApi

  public product: ProductApi
  public category: CategoryApi
  public wishlist: WishlistApi
  public cart: CartApi
  public checkout: CheckoutApi
  public customer: CustomerApi
  public auth: AuthApi
  public payment: PaymentApi

  constructor (config?: BigCommerceConfigOptions) {
    this.restApi = new RestApi(config)
    this.graphqlApi = new GraphqlApi(config)

    this.category = new CategoryApi(this.graphqlApi)
    this.product = new ProductApi(this.graphqlApi, this.category)
    this.wishlist = new WishlistApi(this.restApi)
    this.cart = new CartApi(this.restApi)
    this.checkout = new CheckoutApi(this.restApi)
    this.customer = new CustomerApi(this.restApi, this.graphqlApi, config)
    this.auth = new AuthApi(this.restApi, this.graphqlApi, this.customer)
    this.payment = new PaymentApi(this.restApi, config)
  }

  // TODO: deprecate this method due to security issues.
  public async fetch (query: string) {
    return await this.graphqlApi.sendQuery(query)
  }

  public async getStoreSettings (customQuery?: CustomQuery) {
    const graphQLQuery = customQuery || `
        query SettingsQuery {
          site {
            settings {
              storeHash
              storeName
            }
          }
        }
        `
    return await this.graphqlApi.sendQuery(graphQLQuery)
  }
}
