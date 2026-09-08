import WishlistItem from '../components/product/WishlistItem.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useCart } from '../hooks/useCart.js'
import { useWishlist } from '../hooks/useWishlist.js'

function Wishlist() {
  const { addItem } = useCart()
  const { clearWishlist, itemCount, removeItem, wishlistItems } = useWishlist()

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-amazon-page py-8 sm:py-12">
        <div className="page-container">
          <EmptyState actionLabel="Continue shopping" headingLevel="h1" message="Save products here to find them later." title="Your Wishlist is empty" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-6">
      <div className="page-container">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-amazon-border pb-4">
          <h1 className="text-2xl font-normal text-amazon-text sm:text-3xl">Your Wishlist</h1>
          <button className="text-sm text-amazon-link hover:underline" type="button" onClick={clearWishlist}>
            Clear wishlist
          </button>
        </div>
        <p className="mt-2 text-sm text-amazon-muted">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>

        <section className="mt-5 border border-amazon-border bg-amazon-surface px-4 sm:px-6" aria-label="Wishlist items">
          {wishlistItems.map((item) => (
            <WishlistItem
              item={item}
              key={item.id}
              onAddToCart={addItem}
              onRemove={removeItem}
            />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Wishlist
