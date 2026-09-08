import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import { products } from '../data/products.js'

function Deals() {
  const [discountFilter, setDiscountFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Products with discounts
  const dealProducts = products.filter((p) => {
    const discount = p.discountPercentage ?? 0
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
    
    if (discountFilter === '50') return discount >= 50 && matchesCategory
    if (discountFilter === '30') return discount >= 30 && matchesCategory
    if (discountFilter === '20') return discount >= 20 && matchesCategory
    return discount > 0 && matchesCategory
  })

  const categories = ['all', ...new Set(products.map((p) => p.category))].sort()

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-6">
      <div className="page-container">
        <nav aria-label="Breadcrumb" className="text-xs text-amazon-muted">
          <Link className="text-amazon-link hover:underline" to="/">
            Home
          </Link>
          <span className="px-2" aria-hidden="true">&gt;</span>
          <span>Today's Deals</span>
        </nav>

        <header className="mt-3 border-b border-amazon-border pb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-amazon-text sm:text-3xl">Today's Deals</h1>
              <p className="mt-1 text-sm text-amazon-muted">
                Great Savings. Every Day. Shop Deal of the Day, Lightning Deals, and more.
              </p>
            </div>
            <span className="text-sm font-medium text-amazon-muted">
              {dealProducts.length} {dealProducts.length === 1 ? 'deal' : 'deals'} available
            </span>
          </div>
        </header>

        {/* Filter Section */}
        <div className="mt-5 border border-amazon-border bg-amazon-surface p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-amazon-muted mb-1">
                Discount
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'All Deals', value: 'all' },
                  { label: '50% off or more', value: '50' },
                  { label: '30% off or more', value: '30' },
                  { label: '20% off or more', value: '20' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      discountFilter === option.value
                        ? 'bg-amazon-blue text-white'
                        : 'bg-amazon-page text-amazon-text hover:bg-amazon-border'
                    }`}
                    onClick={() => setDiscountFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:border-l sm:border-amazon-border sm:pl-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-amazon-muted mb-1" htmlFor="category-select">
                Category
              </label>
              <select
                id="category-select"
                className="rounded border border-amazon-border bg-amazon-surface px-3 py-1 text-xs text-amazon-text outline-none focus:border-amazon-focus"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Deals Product Grid */}
        <main className="mt-6" aria-label="Deals list">
          {dealProducts.length === 0 ? (
            <div className="border border-amazon-border bg-amazon-surface p-8 text-center">
              <h2 className="text-xl font-bold text-amazon-text">No deals found</h2>
              <p className="mt-2 text-sm text-amazon-muted">
                Try selecting a different category or discount filter.
              </p>
              <button
                className="mt-4 text-sm font-bold text-amazon-link hover:underline"
                type="button"
                onClick={() => {
                  setDiscountFilter('all')
                  setCategoryFilter('all')
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
              {dealProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Deals
