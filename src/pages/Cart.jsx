import CartItem from '../components/cart/CartItem.jsx'
import CartSummary from '../components/cart/CartSummary.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useCart } from '../hooks/useCart.js'

function Cart() {
  const { cartItems, clearCart, itemCount, removeItem, subtotal, updateQuantity } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-amazon-page py-8 sm:py-12">
        <div className="page-container">
          <EmptyState actionLabel="Continue shopping" headingLevel="h1" message="Explore products and add something you like." title="Your Amazon Cart is empty" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-6">
      <div className="page-container">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-amazon-border pb-4">
          <h1 className="text-2xl font-normal text-amazon-text sm:text-3xl">Shopping Cart</h1>
          <button className="text-sm text-amazon-link hover:underline" type="button" onClick={clearCart}>
            Clear cart
          </button>
        </div>
        <p className="mt-2 text-sm text-amazon-muted">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>

        <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="border border-amazon-border bg-amazon-surface px-4 sm:px-6" aria-label="Cart items">
            {cartItems.map((item) => (
              <CartItem
                item={item}
                key={item.id}
                onQuantityChange={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </section>
          <CartSummary itemCount={itemCount} subtotal={subtotal} />
        </div>
      </div>
    </div>
  )
}

export default Cart
