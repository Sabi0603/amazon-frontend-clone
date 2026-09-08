import products from '../data/products.js'

function copyProduct(product) {
  return {
    ...product,
    images: [...product.images],
  }
}

export async function getProducts() {
  try {
    // Replace this local source with a native fetch call when the REST API is available.
    const localProducts = await Promise.resolve(products)

    if (!Array.isArray(localProducts)) {
      throw new Error('The product data source did not return a collection.')
    }

    return localProducts.map(copyProduct)
  } catch (error) {
    throw new Error('Unable to retrieve products.', { cause: error })
  }
}

export async function getProductById(id) {
  if ((typeof id !== 'string' && typeof id !== 'number') || String(id).trim() === '') {
    throw new TypeError('A valid product ID is required.')
  }

  const productList = await getProducts()
  return productList.find((product) => product.id === String(id)) ?? null
}

export async function searchProducts(query) {
  try {
    const normalizedQuery = String(query ?? '').trim().toLowerCase()

    if (!normalizedQuery) {
      return []
    }

    const productList = await getProducts()

    return productList.filter((product) =>
      [product.title, product.brand, product.category, product.description].some((field) =>
        field.toLowerCase().includes(normalizedQuery),
      ),
    )
  } catch (error) {
    throw new Error('Unable to search products.', { cause: error })
  }
}
