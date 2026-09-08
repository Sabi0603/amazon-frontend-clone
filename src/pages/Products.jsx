import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import ProductSidebar from '../components/product/ProductSidebar.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import useProducts from '../hooks/useProducts.js'
import { filterProducts, SORT_OPTIONS, sortProducts } from '../utils/productFilters.js'

function getFilters(searchParams) {
  return {
    category: searchParams.get('category') ?? '',
    rating: searchParams.get('rating') ?? '',
    price: searchParams.get('price') ?? '',
    availability: searchParams.get('availability') ?? '',
  }
}

function getSort(searchParams) {
  const requestedSort = searchParams.get('sort')
  return SORT_OPTIONS.some((option) => option.value === requestedSort) ? requestedSort : 'featured'
}

function Products() {
  const { products, loading, error } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = getFilters(searchParams)
  const sort = getSort(searchParams)
  const categories = [...new Set(products.map((product) => product.category))].sort()
  const visibleProducts = sortProducts(filterProducts(products, filters), sort)
  const hasActiveState = Object.values(filters).some(Boolean) || sort !== 'featured'

  function updateParams(updates) {
    const nextParams = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        nextParams.set(key, value)
      } else {
        nextParams.delete(key)
      }
    })

    setSearchParams(nextParams)
  }

  function clearAll() {
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-6">
      <div className="page-container">
        <nav aria-label="Breadcrumb" className="text-xs text-amazon-muted">
          <a className="text-amazon-link hover:underline" href="/">
            Home
          </a>
          <span className="px-2" aria-hidden="true">
            &gt;
          </span>
          <span>All Products</span>
        </nav>

        <header className="mt-3 border-b border-amazon-border pb-4">
          <h1 className="text-2xl font-bold text-amazon-text sm:text-3xl">All Products</h1>
          <p className="mt-1 text-sm text-amazon-muted">
            {loading
              ? 'Loading products...'
              : error
                ? 'Products unavailable'
                : `${visibleProducts.length} ${visibleProducts.length === 1 ? 'result' : 'results'}`}
          </p>
        </header>

        <div className="mt-4 md:hidden">
          <details className="border border-amazon-border bg-amazon-surface">
            <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-amazon-text">
              Filter results
            </summary>
            <div className="border-t border-amazon-border p-3">
              <ProductSidebar
                categories={categories}
                filters={filters}
                onClear={clearAll}
                onFilterChange={(key, value) => updateParams({ [key]: value })}
              />
            </div>
          </details>
        </div>

        <div className="mt-5 flex items-start gap-5 lg:gap-7">
          <aside className="hidden w-52 shrink-0 md:block lg:w-60">
            <ProductSidebar
              categories={categories}
              filters={filters}
              onClear={clearAll}
              onFilterChange={(key, value) => updateParams({ [key]: value })}
            />
          </aside>

          <main className="min-w-0 flex-1" aria-labelledby="product-results-heading">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-amazon-border pb-3">
              <h2 id="product-results-heading" className="text-base font-bold text-amazon-text">
                Featured products
              </h2>
              <label className="flex items-center gap-2 text-xs text-amazon-muted">
                <span>Sort by:</span>
                <select
                  className="rounded border border-amazon-border bg-amazon-surface px-2 py-1.5 text-xs text-amazon-text"
                  value={sort}
                  aria-label="Sort products"
                  onChange={(event) => updateParams({ sort: event.target.value })}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {hasActiveState && (
              <div className="mb-4 flex items-center justify-between gap-3 text-xs text-amazon-muted">
                <span>Filters and sorting applied</span>
                <button className="text-amazon-link hover:underline" type="button" onClick={clearAll}>
                  Clear all
                </button>
              </div>
            )}

            {loading && (
              <LoadingState message="Loading products..." />
            )}

            {error && !loading && (
              <ErrorState message="We could not load products right now." />
            )}

            {!loading && !error && visibleProducts.length === 0 && (
              <div className="border border-amazon-border bg-amazon-surface p-8 text-center">
                <h3 className="text-xl font-bold text-amazon-text">No products found</h3>
                <p className="mt-2 text-sm text-amazon-muted">
                  Try adjusting your filters to see more products.
                </p>
                {hasActiveState && (
                  <button
                    className="mt-4 text-sm font-bold text-amazon-link hover:underline"
                    type="button"
                    onClick={clearAll}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {!loading && !error && visibleProducts.length > 0 && (
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 lg:grid-cols-3 2xl:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Products
