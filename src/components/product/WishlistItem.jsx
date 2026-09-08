import { useState } from 'react'

function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

function WishlistItem({ item, onAddToCart, onRemove }) {
  const [added, setAdded] = useState(false)

  return (
    <article className="flex flex-col gap-4 border-b border-amazon-border py-5 first:pt-1 last:border-b-0 sm:flex-row">
      <div
        aria-label={`${item.title} image`}
        className="flex h-36 w-full shrink-0 items-center justify-center bg-white p-3 border border-amazon-border rounded sm:h-40 sm:w-40"
        role="img"
      >
        {item.image ? (
          <img
            alt={item.title}
            className="h-full w-full object-contain"
            src={item.image}
          />
        ) : (
          <div className="flex h-24 w-16 items-center justify-center rounded-lg border-4 border-white/70 bg-amazon-blue/25 shadow-sm">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/90">
              {item.category.slice(0, 3)}
            </span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-base leading-6 text-amazon-text sm:text-lg">{item.title}</h2>
        <p className="mt-1 text-xs font-bold text-amazon-muted">{item.brand}</p>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="text-[#de7921]" aria-label={`${item.rating} out of 5 stars`}>
            {item.rating} <span aria-hidden="true">★</span>
          </span>
          <span className="text-amazon-link">({item.reviewCount.toLocaleString('en-IN')})</span>
        </div>
        <p className="mt-2 text-xl font-medium text-amazon-text">{formatPrice(item.price)}</p>
        <p className={`mt-2 text-xs ${item.availability === 'out_of_stock' ? 'text-[#b12704]' : 'text-[#007600]'}`}>
          {item.availability === 'out_of_stock' ? 'Currently unavailable' : 'In stock'}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="min-h-10 rounded-full bg-amazon-yellow px-5 py-2 text-sm font-medium text-amazon-text hover:bg-[#f3a847] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={item.availability === 'out_of_stock'}
            type="button"
            onClick={() => {
              onAddToCart(item)
              setAdded(true)
            }}
          >
            {added ? 'Added to Cart' : 'Add to Cart'}
          </button>
          <button className="min-h-10 px-2 text-sm text-amazon-link hover:underline" type="button" onClick={() => onRemove(item.id)}>
            Remove from Wishlist
          </button>
        </div>
      </div>
    </article>
  )
}

export default WishlistItem
