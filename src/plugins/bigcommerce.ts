import { defineNuxtPlugin, NuxtApp } from '#app'
import { BigCommerceClientApi } from '../client';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const bigcommerceClientApi = new BigCommerceClientApi();

  nuxtApp.provide('bigcommerce', bigcommerceClientApi)
})
