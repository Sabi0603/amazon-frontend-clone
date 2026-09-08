function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

function CartSummary({ itemCount, subtotal }) {
  return (
    <aside className="border border-amazon-border bg-amazon-surface p-5" aria-label="Cart summary">
      <h2 className="text-xl font-normal text-amazon-text">Subtotal</h2>
      <p className="mt-2 text-2xl font-medium text-amazon-text">
        {formatPrice(subtotal)}
      </p>
      <p className="mt-1 text-sm text-amazon-muted">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </p>
      <div className="my-5 border-t border-amazon-border" />
      <p className="text-sm leading-5 text-amazon-muted">
        Taxes, shipping, and checkout will be available in a later phase.
      </p>
      <button
        className="mt-5 min-h-11 w-full rounded-full bg-amazon-yellow px-5 py-2 text-sm font-medium text-amazon-text opacity-60"
        disabled
        type="button"
      >
        Proceed to checkout
      </button>
    </aside>
  )
}

export default CartSummary
