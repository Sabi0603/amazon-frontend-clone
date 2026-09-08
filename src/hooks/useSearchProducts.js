import { useEffect, useState } from 'react'
import { searchProducts } from '../services/productService.js'

function useSearchProducts(query) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadResults() {
      setLoading(true)
      setError(null)

      try {
        const matchingProducts = await searchProducts(query)

        if (!cancelled) {
          setResults(matchingProducts)
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

    loadResults()

    return () => {
      cancelled = true
    }
  }, [query])

  return { results, loading, error }
}

export default useSearchProducts