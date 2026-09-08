import { useLocation } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import useSearchProducts from '../hooks/useSearchProducts.js'

function SearchResults() {
  const location = useLocation()
  const query = (new URLSearchParams(location.search).get('q') ?? '').trim()
  const { results, loading, error } = useSearchProducts(query)
  const resultLabel = results.length === 1 ? '1 result' : `${results.length} results`

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-6">
      <div className="page-container">
        <nav aria-label="Breadcrumb" className="text-xs text-amazon-muted">
          <a className="text-amazon-link hover:underline" href="/">
            Home
          </a>
          <span className="px-2" aria-hidden="true">
            ›
          </span>
          <span>Search results</span>
        </nav>

        <header className="mt-3 border-b border-amazon-border pb-4">
          <h1 className="text-2xl font-bold text-amazon-text sm:text-3xl">
            {query ? `Results for "${query}"` : 'Search for products'}
          </h1>
          <p className="mt-1 text-sm text-amazon-muted">
            {loading ? 'Searching...' : error ? 'Search unavailable' : resultLabel}
          </p>
        </header>

        <main className="mt-5" aria-labelledby="search-results-heading">
          <h2 id="search-results-heading" className="sr-only">
            Search results for {query || 'products'}
          </h2>

          {loading && (
            <LoadingState message="Searching products..." />
          )}

          {error && !loading && (
            <ErrorState message="We could not complete this search right now." />
          )}

          {!loading && !error && !query && (
            <EmptyState
              message="Enter a product, brand, category, or keyword in the search box above."
              title="Search for products"
            />
          )}

          {!loading && !error && query && results.length === 0 && (
            <EmptyState
              message={`We could not find matches for "${query}". Try a different search term.`}
              title="No results found"
            />
          )}

          {!loading && !error && results.length > 0 && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 lg:grid-cols-3 2xl:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default SearchResults
