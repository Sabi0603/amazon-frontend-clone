import { useEffect, useState } from 'react'
import { getProductById, getProducts } from '../services/productService.js'

function useProducts(productId = null) {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      setLoading(true)
      setError(null)

      try {
        if (productId === null) {
          const result = await getProducts()
          if (!cancelled) {
            setProducts(result)
          }
        } else {
          const result = await getProductById(productId)
          if (!cancelled) {
            setProduct(result)
          }
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [productId])

  return { products, product, loading, error }
}

export default useProducts
