import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGallery from '../components/product/ProductGallery.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import { useCart } from '../hooks/useCart.js'
import { useWishlist } from '../hooks/useWishlist.js'
import useProducts from '../hooks/useProducts.js'

function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

function ProductRating({ product }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
      <span className="text-[#de7921]" aria-label={`${product.rating} out of 5 stars`}>
        {product.rating} <span aria-hidden="true">★</span>
      </span>
      <span className="text-amazon-link">{product.reviewCount.toLocaleString('en-IN')} ratings</span>
    </div>
  )
}

function ProductPurchasePanel({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const isUnavailable = product.availability === 'out_of_stock'

  return (
    <aside className="border border-amazon-border bg-amazon-surface p-5 lg:p-6" aria-label="Purchase information">
      <p className="text-2xl font-medium text-amazon-text">{formatPrice(product.price)}</p>
      {product.originalPrice > product.price && (
        <p className="mt-1 text-sm text-amazon-muted">
          M.R.P.: <span className="line-through">{formatPrice(product.originalPrice)}</span>
        </p>
      )}
      <p className="mt-1 text-sm text-[#b12704]">{product.discountPercentage}% off</p>
      <p className="mt-5 text-sm text-amazon-muted">Inclusive of all taxes</p>
      <div className="my-5 border-t border-amazon-border" />
      <p className={`text-base font-bold ${isUnavailable ? 'text-[#b12704]' : 'text-[#007600]'}`}>
        {isUnavailable ? 'Currently unavailable' : product.availability === 'limited_stock' ? 'Only a few left in stock' : 'In stock'}
      </p>
      <p className="mt-2 text-sm text-amazon-muted">Delivery available across India</p>
      <label className="mt-5 flex items-center gap-3 text-sm text-amazon-text" htmlFor="product-quantity">
        Quantity:
        <select
          className="rounded border border-amazon-border bg-amazon-surface px-3 py-2"
          id="product-quantity"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-5 grid gap-3">
        <button
          className="min-h-11 rounded-full bg-amazon-yellow px-5 py-2 text-sm font-medium text-amazon-text hover:bg-[#f3a847] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isUnavailable}
          type="button"
          onClick={() => {
            addItem(product)
            setAdded(true)
          }}
        >
          {added ? 'Added to Cart' : 'Add to Cart'}
        </button>
        <button
          className="min-h-11 rounded-full bg-amazon-orange px-5 py-2 text-sm font-medium text-amazon-text hover:bg-[#ec8b00] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isUnavailable}
          type="button"
        >
          Buy Now
        </button>
      </div>
      <p className="mt-4 text-xs text-amazon-muted">Purchase actions will be available in a later phase.</p>
    </aside>
  )
}

function ProductDetails() {
  const { productId } = useParams()
  const { product, loading, error } = useProducts(productId)
  const { isWishlisted, toggleItem } = useWishlist()

  if (loading) {
    return (
      <div className="min-h-screen bg-amazon-page py-8">
        <div className="page-container"><LoadingState message="Loading product..." /></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-amazon-page py-8">
        <div className="page-container"><ErrorState message="We could not load this product right now." /></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-amazon-page py-8">
        <div className="page-container"><EmptyState actionLabel="Continue shopping" headingLevel="h1" message="The product you requested is not available." title="Product not found" /></div>
      </div>
    )
  }

  const wishlisted = isWishlisted(product.id)

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-6">
      <div className="page-container">
        <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center text-xs text-amazon-muted">
          <Link className="text-amazon-link hover:underline" to="/">
            Home
          </Link>
          <span className="px-2" aria-hidden="true">&gt;</span>
          <Link className="text-amazon-link hover:underline" to="/products">
            {product.category}
          </Link>
          <span className="px-2" aria-hidden="true">&gt;</span>
          <span className="min-w-0 max-w-full truncate">{product.title}</span>
        </nav>

        <div className="mt-5 grid gap-7 lg:grid-cols-[minmax(280px,1fr)_minmax(320px,1.25fr)_minmax(260px,.8fr)] lg:items-start lg:gap-8">
          <ProductGallery product={product} />

          <section className="min-w-0" aria-labelledby="product-title">
            {product.badge && (
              <span className="inline-block bg-[#cc0c39] px-2 py-1 text-xs font-bold text-white">
                {product.badge}
              </span>
            )}
            <p className="mt-3 text-sm font-bold text-amazon-muted">{product.brand}</p>
            <h1 id="product-title" className="mt-1 text-2xl font-normal leading-tight text-amazon-text sm:text-3xl">
              {product.title}
            </h1>
            <ProductRating product={product} />
            <button
              aria-pressed={wishlisted}
              className={`mt-3 text-sm hover:underline ${wishlisted ? 'text-[#c7511f]' : 'text-amazon-link'}`}
              type="button"
              onClick={() => toggleItem(product)}
            >
              {wishlisted ? 'Remove from Wishlist ♥' : 'Add to Wishlist ♡'}
            </button>
            <div className="my-5 border-t border-amazon-border" />
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-medium text-amazon-text">{formatPrice(product.price)}</span>
              <span className="text-sm text-amazon-muted line-through">{formatPrice(product.originalPrice)}</span>
              <span className="text-sm font-bold text-[#b12704]">{product.discountPercentage}% off</span>
            </div>
            <p className="mt-2 text-xs text-amazon-muted">Inclusive of all taxes</p>
            <div className="my-5 border-t border-amazon-border" />
            <h2 className="text-lg font-bold text-amazon-text">About this item</h2>
            <p className="mt-3 text-sm leading-6 text-amazon-text">{product.description}</p>
            <dl className="mt-6 grid gap-2 border-t border-amazon-border pt-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-bold text-amazon-muted">Brand</dt>
                <dd className="mt-1 text-amazon-text">{product.brand}</dd>
              </div>
              <div>
                <dt className="font-bold text-amazon-muted">Category</dt>
                <dd className="mt-1 text-amazon-text">{product.category}</dd>
              </div>
              <div>
                <dt className="font-bold text-amazon-muted">Availability</dt>
                <dd className="mt-1 text-amazon-text">{product.availability.replace('_', ' ')}</dd>
              </div>
              <div>
                <dt className="font-bold text-amazon-muted">Product ID</dt>
                <dd className="mt-1 text-amazon-text">{product.id}</dd>
              </div>
            </dl>
          </section>

          <ProductPurchasePanel product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
