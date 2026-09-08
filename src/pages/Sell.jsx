import { useState } from 'react'
import { Link } from 'react-router-dom'

function Sell() {
  const [registered, setRegistered] = useState(false)
  const [businessName, setBusinessName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!businessName.trim()) return
    setRegistered(true)
  }

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-8">
      <div className="page-container max-w-5xl">
        <nav aria-label="Breadcrumb" className="text-xs text-amazon-muted mb-4">
          <Link className="text-amazon-link hover:underline" to="/">Home</Link>
          <span className="px-2" aria-hidden="true">&gt;</span>
          <span>Sell on Amazon.in</span>
        </nav>

        {/* Hero */}
        <div className="border border-amazon-border bg-gradient-to-r from-[#131921] to-[#232f3e] p-6 sm:p-12 text-white rounded">
          <span className="text-xs font-bold uppercase tracking-widest text-amazon-orange">Seller Central</span>
          <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold leading-tight">
            Become a Seller on Amazon.in
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
            Reach crores of customers across 100% serviceable pin codes in India. Start your online selling journey in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-8 border border-amazon-border bg-amazon-surface p-6 sm:p-8 rounded">
          <h2 className="text-xl font-bold text-amazon-text mb-6">How to Start Selling in 4 Simple Steps</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-l-4 border-amazon-orange pl-4">
              <span className="text-xs font-bold text-amazon-orange">STEP 1</span>
              <h3 className="mt-1 text-base font-bold text-amazon-text">Register Account</h3>
              <p className="mt-1 text-xs text-amazon-muted leading-relaxed">
                Provide your GSTIN, active bank account and contact details.
              </p>
            </div>
            <div className="border-l-4 border-amazon-orange pl-4">
              <span className="text-xs font-bold text-amazon-orange">STEP 2</span>
              <h3 className="mt-1 text-base font-bold text-amazon-text">List Products</h3>
              <p className="mt-1 text-xs text-amazon-muted leading-relaxed">
                Add your catalog using simple listing tools or bulk excel uploads.
              </p>
            </div>
            <div className="border-l-4 border-amazon-orange pl-4">
              <span className="text-xs font-bold text-amazon-orange">STEP 3</span>
              <h3 className="mt-1 text-base font-bold text-amazon-text">Deliver Orders</h3>
              <p className="mt-1 text-xs text-amazon-muted leading-relaxed">
                Choose Fulfillment by Amazon (FBA) or Easy Ship for hassle-free delivery.
              </p>
            </div>
            <div className="border-l-4 border-amazon-orange pl-4">
              <span className="text-xs font-bold text-amazon-orange">STEP 4</span>
              <h3 className="mt-1 text-base font-bold text-amazon-text">Receive Payments</h3>
              <p className="mt-1 text-xs text-amazon-muted leading-relaxed">
                Funds deposited directly into your bank account every 7 days.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Seller Registration */}
        <div className="mt-8 border border-amazon-border bg-amazon-surface p-6 sm:p-8 rounded">
          <h2 className="text-xl font-bold text-amazon-text">Start Your Selling Journey Today</h2>
          <p className="mt-1 text-sm text-amazon-muted">
            Register your business name below to launch your seller demo storefront.
          </p>

          {registered ? (
            <div className="mt-6 border border-[#b7d7b9] bg-[#f3fff3] p-5 rounded">
              <p className="text-sm font-bold text-[#007600]">Seller Application Registered!</p>
              <p className="mt-1 text-sm text-amazon-text">
                Welcome, <strong>{businessName}</strong>! Your demo seller account is active on Amazon.in.
              </p>
              <div className="mt-4 flex gap-3">
                <Link to="/products" className="rounded-full bg-amazon-yellow px-5 py-2 text-xs font-bold text-amazon-text hover:bg-[#f3a847]">
                  View Marketplace
                </Link>
                <button
                  type="button"
                  className="rounded-full border border-amazon-border px-4 py-2 text-xs text-amazon-text hover:bg-amazon-page"
                  onClick={() => setRegistered(false)}
                >
                  Register Another Business
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
              <div>
                <label className="block text-xs font-bold text-amazon-text mb-1" htmlFor="biz-name">
                  Company / Store Name
                </label>
                <input
                  id="biz-name"
                  type="text"
                  required
                  placeholder="e.g. Acme Indian Crafts"
                  className="w-full rounded border border-[#888] px-3 py-2 text-sm outline-none focus:border-amazon-focus"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-amazon-text mb-1" htmlFor="biz-cat">
                  Primary Selling Category
                </label>
                <select
                  id="biz-cat"
                  className="w-full rounded border border-[#888] px-3 py-2 text-sm outline-none focus:border-amazon-focus bg-white"
                >
                  <option>Electronics &amp; Accessories</option>
                  <option>Home &amp; Kitchen</option>
                  <option>Apparel &amp; Fashion</option>
                  <option>Books &amp; Media</option>
                  <option>Health &amp; Beauty</option>
                </select>
              </div>
              <button
                type="submit"
                className="rounded-full bg-amazon-yellow px-6 py-2.5 text-sm font-bold text-amazon-text hover:bg-[#f3a847]"
              >
                Start Selling
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sell
