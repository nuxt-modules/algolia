export const productFragment = `
fragment ProductFields on Product {
  id
  entityId
  name
  sku
  path
  description
  addToCartUrl
  addToWishlistUrl
  categories {
    edges {
      node {name}
    }
  }
  defaultImage {
    img320px: url(width: 320)
    img640px: url(width: 640)
    img960px: url(width: 960)
    img1280px: url(width: 1280)
    altText
  }

  prices {
    price {
      value
      currencyCode
    }
  }
}
`

export const categoryFragment = `
fragment CategoryFields on CategoryTreeItem {
  name
  path
  entityId
  description
  productCount
}
`
