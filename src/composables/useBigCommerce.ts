import { BigCommerceClientApi } from "../client";

export const useBigCommerce = () => {
  // TODO: Refactor into separate composables for each entity like product, cart, etc
  const { product, cart, category, checkout, customer, auth, wishlist, payment } = new BigCommerceClientApi();

  return {
    product,
    category,
    cart,
    checkout,
    customer,
    auth,
    wishlist,
    payment
  }
}
