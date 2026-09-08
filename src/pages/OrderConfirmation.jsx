import { Link } from 'react-router-dom'
import OrderSummary from '../components/order/OrderSummary.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useOrder } from '../hooks/useOrder.js'
import { formatINR } from '../utils/checkout.js'

function OrderConfirmation() {
  const { latestOrder } = useOrder()

  if (!latestOrder) {
    return (
      <div className="min-h-screen bg-amazon-page py-8 sm:py-12">
        <div className="page-container">
          <EmptyState actionLabel="Continue shopping" headingLevel="h1" message="Complete checkout to see your order confirmation here." title="No recent order found" />
        </div>
      </div>
    )
  }

  const orderDate = new Date(latestOrder.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-8">
      <div className="page-container">
        <div className="border border-[#b7d7b9] bg-[#f3fff3] p-5 sm:p-7">
          <p className="text-sm font-bold text-[#007600]">Order placed successfully</p>
          <h1 className="mt-2 text-2xl font-normal text-amazon-text sm:text-3xl">Thank you for your order</h1>
          <p className="mt-2 text-sm text-amazon-muted">Your frontend demo order has been created.</p>
        </div>

        <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="grid gap-5">
            <section className="border border-amazon-border bg-amazon-surface p-5 sm:p-6" aria-labelledby="order-details-heading">
              <h2 id="order-details-heading" className="text-xl font-normal text-amazon-text">Order details</h2>
              <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                <div><dt className="font-bold text-amazon-muted">Order ID</dt><dd className="mt-1 text-amazon-text">{latestOrder.id}</dd></div>
                <div><dt className="font-bold text-amazon-muted">Order date</dt><dd className="mt-1 text-amazon-text">{orderDate}</dd></div>
                <div><dt className="font-bold text-amazon-muted">Payment method</dt><dd className="mt-1 uppercase text-amazon-text">{latestOrder.paymentMethod}</dd></div>
                <div><dt className="font-bold text-amazon-muted">Status</dt><dd className="mt-1 text-[#007600]">{latestOrder.status}</dd></div>
              </dl>
            </section>
            <section className="border border-amazon-border bg-amazon-surface p-5 sm:p-6" aria-labelledby="delivery-details-heading">
              <h2 id="delivery-details-heading" className="text-xl font-normal text-amazon-text">Delivery information</h2>
              <p className="mt-4 text-sm leading-6 text-amazon-text">
                {latestOrder.shippingAddress.fullName}<br />
                {latestOrder.shippingAddress.address}<br />
                {latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.state} {latestOrder.shippingAddress.pinCode}<br />
                Mobile: {latestOrder.shippingAddress.mobile}
              </p>
            </section>
            <OrderSummary order={latestOrder} />
          </div>

          <aside className="border border-amazon-border bg-amazon-surface p-5" aria-label="Order total">
            <h2 className="text-xl font-normal text-amazon-text">Order total</h2>
            <dl className="mt-5 space-y-3 text-sm text-amazon-text">
              <div className="flex justify-between gap-4"><dt>Subtotal</dt><dd>{formatINR(latestOrder.subtotal)}</dd></div>
              <div className="flex justify-between gap-4"><dt>Delivery</dt><dd>{latestOrder.shipping ? formatINR(latestOrder.shipping) : 'FREE'}</dd></div>
              <div className="border-t border-amazon-border pt-3 text-base font-bold"><div className="flex justify-between gap-4"><dt>Total</dt><dd>{formatINR(latestOrder.total)}</dd></div></div>
            </dl>
            <div className="mt-6 grid gap-3">
              <Link className="rounded-full bg-amazon-yellow px-5 py-3 text-center text-sm font-medium text-amazon-text hover:bg-[#f3a847]" to="/products">Continue shopping</Link>
              <Link className="rounded-full border border-amazon-border px-5 py-3 text-center text-sm text-amazon-text hover:bg-amazon-page" to="/cart">View cart</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
