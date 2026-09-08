function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <article className="flex gap-4 border-b border-amazon-border py-5 first:pt-1 last:border-b-0">
      <div
        aria-label={`${item.title} image`}
        className="flex h-28 w-28 shrink-0 items-center justify-center bg-white p-2 border border-amazon-border rounded sm:h-36 sm:w-36"
        role="img"
      >
        {item.image ? (
          <img
            alt={item.title}
            className="h-full w-full object-contain"
            src={item.image}
          />
        ) : (
          <div className="flex h-20 w-14 items-center justify-center rounded-lg border-4 border-white/70 bg-amazon-blue/25 shadow-sm">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/90">
              {item.category.slice(0, 3)}
            </span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-base leading-6 text-amazon-text sm:text-lg">{item.title}</h2>
        <p className="mt-1 text-xs font-bold text-amazon-muted">{item.brand}</p>
        <p className="mt-2 text-xs text-[#007600]">
          {item.availability === 'limited_stock' ? 'Only a few left in stock' : 'In stock'}
        </p>
        <p className="mt-2 text-lg font-medium text-amazon-text">{formatPrice(item.price)}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <label className="flex items-center gap-2" htmlFor={`quantity-${item.id}`}>
            Qty:
            <select
              className="rounded border border-amazon-border bg-amazon-surface px-2 py-1.5"
              id={`quantity-${item.id}`}
              value={item.quantity}
              onChange={(event) => onQuantityChange(item.id, event.target.value)}
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
          </label>
          <span className="h-5 border-l border-amazon-border" aria-hidden="true" />
          <button className="text-amazon-link hover:underline" type="button" onClick={() => onRemove(item.id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default CartItem
