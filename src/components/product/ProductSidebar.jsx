import { PRICE_RANGES } from '../../utils/productFilters.js'

const ratingOptions = [
  { label: '4★ & Up', value: '4' },
  { label: '3★ & Up', value: '3' },
  { label: '2★ & Up', value: '2' },
]

function ProductSidebar({ categories, filters, onFilterChange, onClear }) {
  const hasActiveFilters = Object.values(filters).some(Boolean)

  return (
    <aside className="border border-amazon-border bg-amazon-surface p-4 text-sm text-amazon-text">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold">Filter</h2>
        {hasActiveFilters && (
          <button className="text-xs text-amazon-link hover:underline" type="button" onClick={onClear}>
            Clear all
          </button>
        )}
      </div>
      <div className="mt-4 divide-y divide-amazon-border">
        <fieldset className="py-4 first:pt-0">
          <legend className="font-bold">Department</legend>
          <div className="mt-3 space-y-2.5">
            <label className="flex items-start gap-2">
              <input
                checked={!filters.category}
                className="mt-0.5 accent-amazon-orange"
                name="product-category"
                type="radio"
                value=""
                onChange={() => onFilterChange('category', '')}
              />
              <span>All Categories</span>
            </label>
            {categories.map((category) => (
              <label className="flex items-start gap-2" key={category}>
                <input
                  checked={filters.category === category}
                  className="mt-0.5 accent-amazon-orange"
                  name="product-category"
                  type="radio"
                  value={category}
                  onChange={() => onFilterChange('category', category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="py-4">
          <legend className="font-bold">Customer Reviews</legend>
          <div className="mt-3 space-y-2.5">
            <label className="flex items-start gap-2">
              <input
                checked={!filters.rating}
                className="mt-0.5 accent-amazon-orange"
                name="product-rating"
                type="radio"
                value=""
                onChange={() => onFilterChange('rating', '')}
              />
              <span>All ratings</span>
            </label>
            {ratingOptions.map((option) => (
              <label className="flex items-start gap-2" key={option.value}>
                <input
                  checked={filters.rating === option.value}
                  className="mt-0.5 accent-amazon-orange"
                  name="product-rating"
                  type="radio"
                  value={option.value}
                  onChange={() => onFilterChange('rating', option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="py-4">
          <legend className="font-bold">Price</legend>
          <div className="mt-3 space-y-2.5">
            {PRICE_RANGES.map((range) => (
              <label className="flex items-start gap-2" key={range.value || 'all-prices'}>
                <input
                  checked={filters.price === range.value}
                  className="mt-0.5 accent-amazon-orange"
                  name="product-price"
                  type="radio"
                  value={range.value}
                  onChange={() => onFilterChange('price', range.value)}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="py-4 last:pb-0">
          <legend className="font-bold">Availability</legend>
          <label className="mt-3 flex items-start gap-2">
            <input
              checked={filters.availability === 'in-stock'}
              className="mt-0.5 accent-amazon-orange"
              type="checkbox"
              onChange={(event) =>
                onFilterChange('availability', event.target.checked ? 'in-stock' : '')
              }
            />
            <span>In stock</span>
          </label>
        </fieldset>
      </div>
    </aside>
  )
}

export default ProductSidebar
