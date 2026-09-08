export const PRICE_RANGES = [
  { label: 'All prices', value: '' },
  { label: 'Under ₹1,000', value: 'under-1000', max: 1000 },
  { label: '₹1,000 - ₹5,000', value: '1000-5000', min: 1000, max: 5000 },
  { label: '₹5,000 - ₹20,000', value: '5000-20000', min: 5000, max: 20000 },
  { label: 'Over ₹20,000', value: 'over-20000', min: 20000 },
]

export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Customer Rating', value: 'rating' },
  { label: 'Newest', value: 'newest' },
]

function matchesPriceRange(product, priceRange) {
  if (!priceRange) {
    return true
  }

  const selectedRange = PRICE_RANGES.find((range) => range.value === priceRange)

  if (!selectedRange) {
    return true
  }

  if (selectedRange.min !== undefined && product.price < selectedRange.min) {
    return false
  }

  if (selectedRange.max !== undefined && product.price >= selectedRange.max) {
    return false
  }

  return true
}

export function filterProducts(products, filters) {
  return products.filter((product) => {
    const matchesCategory = !filters.category || product.category === filters.category
    const matchesRating = !filters.rating || product.rating >= Number(filters.rating)
    const matchesAvailability =
      filters.availability !== 'in-stock' || product.availability === 'in_stock'

    return (
      matchesCategory &&
      matchesRating &&
      matchesPriceRange(product, filters.price)
      && matchesAvailability
    )
  })
}

export function sortProducts(products, sort) {
  const sortedProducts = [...products]

  switch (sort) {
    case 'price-low':
      return sortedProducts.sort((first, second) => first.price - second.price)
    case 'price-high':
      return sortedProducts.sort((first, second) => second.price - first.price)
    case 'rating':
      return sortedProducts.sort((first, second) => second.rating - first.rating)
    case 'newest':
      return sortedProducts.sort((first, second) =>
        second.id.localeCompare(first.id, undefined, { numeric: true }),
      )
    default:
      return sortedProducts
  }
}
