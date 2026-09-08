import { Link } from 'react-router-dom'
import { useWishlist } from '../../hooks/useWishlist.js'

function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

function Rating({ value, reviews }) {
  return (
    <div className="mt-2 flex items-center gap-1 text-xs">
      <span className="text-[#de7921]" aria-label={`${value} out of 5 stars`}>
        {value} <span aria-hidden="true">★</span>
      </span>
      <span className="text-amazon-link">({reviews.toLocaleString('en-IN')})</span>
    </div>
  )
}

function ProductCard({ product }) {
  const reviewCount = product.reviewCount ?? product.reviews ?? 0
  const visualClass = product.visualClass ?? 'bg-[#eef0f0]'
  const { isWishlisted, toggleItem } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  return (
    <article className="relative min-w-0 bg-amazon-surface">
      <Link className="block outline-offset-2" to={`/products/${product.id}`}>
        {product.badge && (
          <span className="absolute z-10 bg-[#cc0c39] px-2 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>
        )}
        <div
          role="img"
          aria-label={product.title}
          className="flex aspect-square items-center justify-center overflow-hidden p-3 bg-white"
        >
          {product.image ? (
            <img
              alt={product.title}
              className="h-full w-full object-contain"
              loading="lazy"
              src={product.image}
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center ${visualClass}`}>
              <div className="flex h-32 w-24 items-center justify-center rounded-lg border-4 border-white/50 bg-black/15 shadow-lg">
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                  {product.category?.slice(0, 3)}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="border-x border-b border-amazon-border px-3 pb-4 pt-3">
          {product.brand && <p className="text-xs font-bold text-amazon-muted">{product.brand}</p>}
          <h3 className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-amazon-text">{product.title}</h3>
          <Rating value={product.rating} reviews={reviewCount} />
          <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p className="text-xl font-medium text-amazon-text">
              {typeof product.price === 'number' ? formatPrice(product.price) : product.price}
            </p>
            {typeof product.originalPrice === 'number' && (
              <span className="text-xs text-amazon-muted line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {typeof product.discountPercentage === 'number' && (
            <p className="text-xs font-semibold text-[#cc0c39]">{product.discountPercentage}% off</p>
          )}
          {product.availability && (
            <p className="mt-2 text-xs text-amazon-muted">
              {product.availability === 'out_of_stock' ? 'Currently unavailable' : 'In stock'}
            </p>
          )}
          {product.metadata && <p className="mt-1 text-xs text-amazon-muted">{product.metadata}</p>}
        </div>
      </Link>
      <button
        aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        aria-pressed={wishlisted}
        className={`absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl shadow-sm outline-offset-2 hover:text-[#c7511f] ${wishlisted ? 'text-[#c7511f]' : 'text-amazon-muted'}`}
        type="button"
        onClick={() => toggleItem(product)}
      >
        <span aria-hidden="true">{wishlisted ? '♥' : '♡'}</span>
      </button>
    </article>
  )
}

export default ProductCard
