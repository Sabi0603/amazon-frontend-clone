import { formatINR } from '../../utils/checkout.js'

function OrderSummary({ order }) {
  return (
    <section className="border border-amazon-border bg-amazon-surface p-5 sm:p-6" aria-labelledby="order-items-heading">
      <h2 id="order-items-heading" className="text-xl font-normal text-amazon-text">Items in this order</h2>
      <div className="mt-5 divide-y divide-amazon-border">
        {order.items.map((item) => (
          <article className="flex gap-4 py-4 first:pt-0" key={item.id}>
            <div aria-label={`${item.title} image`} className="flex h-20 w-20 shrink-0 items-center justify-center bg-white p-1 border border-amazon-border rounded" role="img">
              {item.image ? (
                <img alt={item.title} className="h-full w-full object-contain" src={item.image} />
              ) : (
                <span className="text-[9px] font-bold uppercase tracking-wider text-amazon-blue">{item.category.slice(0, 3)}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-amazon-text">{item.title}</h3>
              <p className="mt-1 text-xs text-amazon-muted">Quantity: {item.quantity}</p>
              <p className="mt-1 text-sm font-medium text-amazon-text">{formatINR(item.price * item.quantity)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default OrderSummary
