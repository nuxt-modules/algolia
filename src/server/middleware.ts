import { GraphqlApi } from '../api/graphql-api'
import { RestApi } from '../api/rest-api'
import { BigCommerceConfigOptions } from '../types'
import { formatResponse } from '../utils/format-response'

const bodyParser = require('body-parser')
const app = require('express')()

export const createMiddleware = (configuration: BigCommerceConfigOptions) => {
  const restApi = new RestApi(configuration)
  const graphqlApi = new GraphqlApi(configuration)
  app.use(bodyParser.json())

  // eslint-disable-next-line
  app.post("/graphql", async (req: any, res: any) => {
    const result = await graphqlApi.sendQuery(req.body.query, req.headers.cookie)

    formatResponse(res, result)
    // res.send(result)
  })

  // eslint-disable-next-line
  app.get("/v3/wishlists/:wishlistId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'GET', endpoint: `/v3/wishlists/${req.params.wishlistId}` })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.post("/v3/wishlists", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'POST', endpoint: '/v3/wishlists', body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.post("/v3/wishlists/:wishlistId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'POST', endpoint: `/v3/wishlists/${req.params.wishlistId}`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.delete("/v3/wishlists/:wishlistId/items/:wishlistItemId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'DELETE', endpoint: `/v3/wishlists/${req.params.wishlistId}/items/${req.params.wishlistItemId}` })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.get("/v2/orders", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'GET', endpoint: `/v2/orders?customer_id=${req.query.customer_id}&channel_id=${configuration.channelId}` })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.get("/v2/customers/:customerId/addresses", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'GET', endpoint: `/v2/customers/${req.params.customerId}/addresses` })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.put("/v2/customers/:customerId/addresses/:addressId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'PUT', endpoint: `/v2/customers/${req.params.customerId}/addresses/${req.params.addressId}`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.post("/v2/customers/:customerId/addresses", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'POST', endpoint: `/v2/customers/${req.params.customerId}/addresses`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.delete("/v2/customers/:customerId/addresses/:addressId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'DELETE', endpoint: `/v2/customers/${req.params.customerId}/addresses/${req.params.addressId}` })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.post("/v3/checkouts/:checkoutId/orders", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'POST', endpoint: `/v3/checkouts/${req.params.checkoutId}/orders` })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.get("/v3/checkouts/:checkoutId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'GET', endpoint: `/v3/checkouts/${req.params.checkoutId}?includes=consignments.available_shipping_options` })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.post("/v3/checkouts/:checkoutId/consignments", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'POST', endpoint: `/v3/checkouts/${req.params.checkoutId}/consignments`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.put("/v3/checkouts/:checkoutId/consignments/:consignmentId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'PUT', endpoint: `/v3/checkouts/${req.params.checkoutId}/consignments/${req.params.consignmentId}`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.put("/v3/checkouts/:checkoutId/consignments/:consignmentId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'PUT', endpoint: `/v3/checkouts/${req.params.checkoutId}/consignments/${req.params.consignmentId}`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.post("/v3/checkouts/:checkoutId/billing-address", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'POST', endpoint: `/v3/checkouts/${req.params.checkoutId}/billing-address`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.get("/v3/checkouts/:checkoutId/coupons", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'GET', endpoint: `/v3/checkouts/${req.params.checkoutId}/coupons`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.get("/v3/carts/:cartId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'GET', endpoint: `/v3/carts/${req.params.cartId}?include=redirect_urls,line_items.physical_items.options` })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.post("/v3/carts", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'POST', endpoint: '/v3/carts?include=redirect_urls', body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.post("/v3/carts/:cartId/items", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'POST', endpoint: `/v3/carts/${req.params.cartId}/items?include=redirect_urls`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.put("/v3/carts/:cartId/items/:itemId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'PUT', endpoint: `/v3/carts/${req.params.cartId}/items/${req.params.itemId}?include=redirect_urls`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.delete("/v3/carts/:cartId/items/:itemId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'DELETE', endpoint: `/v3/carts/${req.params.cartId}/items/${req.params.itemId}?include=redirect_urls` })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.put("/v3/carts/:cartId", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'PUT', endpoint: `/v3/carts/${req.params.cartId}`, body: req.body })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.post("/v3/customers", async (req: any, res: any) => {
    const result = await restApi.sendRequest({ method: 'POST', endpoint: '/v3/customers', body: JSON.stringify([req.body]) })

    formatResponse(res, result)
  })

  // eslint-disable-next-line
  app.post("/proxy/payments", async (req: any, res: any) => {
    const { orderId, paymentData } = req.body
    const tokenResult = await restApi.sendRequest({ method: 'POST', endpoint: '/v3/payments/access_tokens', body: { order: { id: orderId } } })

    const result = await restApi.sendPaymentRequest({ method: 'POST', endpoint: `${configuration.storeHash}/payments`, body: paymentData, auth: tokenResult.data?.data?.id })

    formatResponse(res, result)
  })

  return app
}
