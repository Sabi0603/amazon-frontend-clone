import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'

function GiftCards() {
  const { addItem } = useCart()
  const [amount, setAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState('')
  const [design, setDesign] = useState('birthday')
  const [added, setAdded] = useState(false)
  const [recipient, setRecipient] = useState('')

  const designs = [
    { id: 'birthday', label: 'Birthday', bg: 'from-amber-500 to-orange-600', text: 'Happy Birthday!' },
    { id: 'congrats', label: 'Congratulations', bg: 'from-blue-600 to-indigo-800', text: 'Congratulations!' },
    { id: 'diwali', label: 'Festival / Diwali', bg: 'from-purple-600 to-pink-600', text: 'Happy Celebrations!' },
    { id: 'thanks', label: 'Thank You', bg: 'from-emerald-600 to-teal-800', text: 'Thank You!' },
  ]

  const activeAmount = customAmount ? Number(customAmount) : amount

  function handleAddToCart(e) {
    e.preventDefault()
    addItem({
      id: `gc-${Date.now()}`,
      title: `Amazon Pay eGift Card (${designs.find(d => d.id === design)?.label}) - ₹${activeAmount}`,
      brand: 'Amazon Pay',
      price: activeAmount,
      originalPrice: activeAmount,
      discountPercentage: 0,
      rating: 4.8,
      reviewCount: 24890,
      image: null,
      images: [],
      category: 'Gift Cards',
      availability: 'in_stock',
    })
    setAdded(true)
  }

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-8">
      <div className="page-container max-w-5xl">
        <nav aria-label="Breadcrumb" className="text-xs text-amazon-muted mb-4">
          <Link className="text-amazon-link hover:underline" to="/">Home</Link>
          <span className="px-2" aria-hidden="true">&gt;</span>
          <span>Amazon Pay Gift Cards</span>
        </nav>

        <header className="border-b border-amazon-border pb-4 mb-6">
          <h1 className="text-2xl font-bold text-amazon-text sm:text-3xl">
            Amazon Pay Gift Cards
          </h1>
          <p className="mt-1 text-sm text-amazon-muted">
            The gift of choice. Valid on 10+ crore products across Amazon.in with instant email delivery.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start">
          {/* Card Preview */}
          <div className="border border-amazon-border bg-amazon-surface p-6 sm:p-8 rounded">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amazon-muted mb-4">
              Card Preview
            </h2>
            <div className={`aspect-[16/10] w-full rounded-2xl bg-gradient-to-br ${designs.find(d => d.id === design)?.bg} p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between`}>
              <div className="flex justify-between items-start">
                <span className="text-2xl font-black tracking-tight">amazon<span className="text-amazon-yellow text-lg">.in</span></span>
                <span className="rounded bg-white/20 px-2 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                  Gift Card
                </span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {designs.find(d => d.id === design)?.text}
                </p>
                {recipient && <p className="mt-1 text-xs text-white/90">For: {recipient}</p>}
              </div>
              <div className="flex justify-between items-baseline border-t border-white/20 pt-3">
                <span className="text-xs text-white/80">Instant Delivery via Email</span>
                <span className="text-xl sm:text-2xl font-black">₹{activeAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Design selector */}
            <div className="mt-6">
              <span className="block text-xs font-bold text-amazon-text mb-2">Select Design</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {designs.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`border py-2 px-3 rounded text-xs font-bold transition-all ${
                      design === d.id
                        ? 'border-amazon-orange bg-amazon-yellow/20 text-amazon-text'
                        : 'border-amazon-border text-amazon-muted hover:border-amazon-text'
                    }`}
                    onClick={() => setDesign(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Configuration & Order */}
          <div className="border border-amazon-border bg-amazon-surface p-6 sm:p-8 rounded">
            <h2 className="text-lg font-bold text-amazon-text mb-4">Gift Card Details</h2>
            <form onSubmit={handleAddToCart} className="space-y-4">
              {/* Amounts */}
              <div>
                <span className="block text-xs font-bold text-amazon-text mb-2">Choose an Amount</span>
                <div className="flex flex-wrap gap-2">
                  {[500, 1000, 2000, 5000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className={`rounded border px-4 py-2 text-sm font-bold ${
                        amount === amt && !customAmount
                          ? 'border-amazon-orange bg-amazon-yellow/20 text-amazon-text'
                          : 'border-amazon-border bg-white text-amazon-text hover:bg-amazon-page'
                      }`}
                      onClick={() => {
                        setAmount(amt)
                        setCustomAmount('')
                      }}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="custom-amt" className="block text-xs font-bold text-amazon-muted mb-1">
                  Or enter custom amount (₹100 - ₹50,000)
                </label>
                <input
                  id="custom-amt"
                  type="number"
                  min="100"
                  max="50000"
                  placeholder="₹ Amount"
                  className="w-full rounded border border-[#888] px-3 py-2 text-sm outline-none focus:border-amazon-focus"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="recipient-email" className="block text-xs font-bold text-amazon-text mb-1">
                  Recipient Email
                </label>
                <input
                  id="recipient-email"
                  type="email"
                  required
                  placeholder="friend@example.com"
                  className="w-full rounded border border-[#888] px-3 py-2 text-sm outline-none focus:border-amazon-focus"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full min-h-11 rounded-full bg-amazon-yellow px-6 py-2.5 text-sm font-bold text-amazon-text shadow-sm hover:bg-[#f3a847]"
                >
                  {added ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
              </div>

              {added && (
                <div className="border border-[#b7d7b9] bg-[#f3fff3] p-3 rounded text-center">
                  <p className="text-xs font-bold text-[#007600]">Gift Card Added to Shopping Cart!</p>
                  <Link to="/cart" className="text-xs font-bold text-amazon-link hover:underline mt-1 inline-block">
                    View in Cart &amp; Checkout →
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GiftCards
