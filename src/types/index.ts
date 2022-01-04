export interface BigCommerceConfigOptions {
  storefrontToken: string;
  apiToken: string;
  storeUrl: string;
  storeHash: string;
  channelId: number;
  enableServerMiddleware?: boolean;
  includeValuesInRuntimeConfig?: string[];
};

export type CustomQuery = string;

export type SendRequest = {
  method?: string;
  endpoint: string;
  body?: any;
  cookie?: any;
  auth?: any;
}

export type WishlistData = {
  name: string,
  items: any,
  customer_id: number,
  is_public: boolean
}

export type Credentials = {
  email: string;
  password: string;
}

export type RegisterData = {
  first_name: string,
  last_name: string,
  email: string,
  authentication: {
    new_password: string,
  }
}

export type CreateCartData = {
  line_items: any[];
  channel_id: number;
}
