import { formatINR } from '../../utils/checkout.js'

function CheckoutSummary({ itemCount, subtotal, shipping, submitting }) {
  const total = subtotal + shipping

  return (
    <aside className="border border-amazon-border bg-amazon-surface p-5" aria-label="Checkout summary">
      <h2 className="text-xl font-normal text-amazon-text">Order summary</h2>
      <dl className="mt-5 space-y-3 text-sm text-amazon-text">
        <div className="flex justify-between gap-4"><dt>Items ({itemCount})</dt><dd>{formatINR(subtotal)}</dd></div>
        <div className="flex justify-between gap-4"><dt>Delivery</dt><dd>{shipping ? formatINR(shipping) : 'FREE'}</dd></div>
        <div className="border-t border-amazon-border pt-3 text-base font-bold"><div className="flex justify-between gap-4"><dt>Order total</dt><dd>{formatINR(total)}</dd></div></div>
      </dl>
      <button className="mt-6 min-h-11 w-full rounded-full bg-amazon-yellow px-5 py-2 text-sm font-medium text-amazon-text hover:bg-[#f3a847] disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting} type="submit" form="checkout-form">
        {submitting ? 'Placing order...' : 'Place your order'}
      </button>
      <p className="mt-3 text-xs text-amazon-muted">This is a frontend demo. No real payment will be processed.</p>
    </aside>
  )
}

export default CheckoutSummary
