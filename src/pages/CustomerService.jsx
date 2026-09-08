import { useState } from 'react'
import { Link } from 'react-router-dom'

function CustomerService() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const helpTopics = [
    { title: 'Your Orders', desc: 'Track packages, edit or cancel orders', icon: '📦', link: '/profile' },
    { title: 'Returns & Refunds', desc: 'Return or exchange items, print return mailing labels', icon: '🔄', link: '/profile' },
    { title: 'Manage Addresses', desc: 'Update delivery addresses and preferences', icon: '📍', link: '/profile' },
    { title: 'Payment Settings', desc: 'Manage payment methods and settings', icon: '💳', link: '/profile' },
    { title: 'Account Settings', desc: 'Change email, password or name', icon: '👤', link: '/profile' },
    { title: 'Safe Online Shopping', desc: 'Learn about security, phishing, and scam protection', icon: '🔒', link: '#' },
  ]

  const faqs = [
    {
      q: "Where is my order?",
      a: "You can track your package by visiting 'Your Orders' in your Account page. Once an order is confirmed, delivery estimates and courier status will be shown there."
    },
    {
      q: "How do I return an item on Amazon Clone?",
      a: "Go to Your Orders and select 'Return or replace items'. Follow the on-screen instructions to select your return reason and choose your preferred pickup or drop-off method."
    },
    {
      q: "What payment methods are supported?",
      a: "We support Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm, BHIM), and all major Credit and Debit cards (Visa, Mastercard, RuPay)."
    },
    {
      q: "Is Cash on Delivery available on all products?",
      a: "Yes, COD is available for all eligible products across all pin codes in India for orders up to ₹50,000."
    },
    {
      q: "How do I cancel an order?",
      a: "If your order has not been dispatched yet, you can cancel it directly from Your Orders section with a single click."
    },
  ]

  const filteredFaqs = searchQuery.trim()
    ? faqs.filter(f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-8">
      <div className="page-container max-w-5xl">
        <nav aria-label="Breadcrumb" className="text-xs text-amazon-muted mb-4">
          <Link className="text-amazon-link hover:underline" to="/">Home</Link>
          <span className="px-2" aria-hidden="true">&gt;</span>
          <span>Customer Service</span>
        </nav>

        {/* Hero search */}
        <div className="border border-amazon-border bg-amazon-surface p-6 sm:p-10 text-center rounded">
          <h1 className="text-2xl font-normal text-amazon-text sm:text-3xl">
            Hello. What can we help you with?
          </h1>
          <p className="mt-2 text-sm text-amazon-muted">
            Search our help library or choose a topic below
          </p>
          <div className="mx-auto mt-6 max-w-xl">
            <input
              type="search"
              aria-label="Search help topics"
              placeholder="Search help by topic or keyword (e.g., return, refund, payment)"
              className="w-full rounded border border-[#888] px-4 py-2.5 text-sm outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Quick topic cards */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-amazon-text mb-4">Quick Solutions</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {helpTopics.map((topic) => (
              <Link
                key={topic.title}
                to={topic.link}
                className="flex items-start gap-4 border border-amazon-border bg-amazon-surface p-4 rounded hover:shadow-md transition-shadow"
              >
                <span className="text-3xl" aria-hidden="true">{topic.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-amazon-text">{topic.title}</h3>
                  <p className="mt-1 text-xs text-amazon-muted leading-relaxed">{topic.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-10 border border-amazon-border bg-amazon-surface p-6 rounded">
          <h2 className="text-xl font-bold text-amazon-text mb-4">Frequently Asked Questions</h2>
          <div className="divide-y divide-amazon-border">
            {filteredFaqs.map((faq, index) => (
              <div key={faq.q} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left text-base font-semibold text-amazon-text hover:text-amazon-link"
                  aria-expanded={activeFaq === index}
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <span className="text-lg font-bold text-amazon-muted ml-2">
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === index && (
                  <p className="mt-2 text-sm text-amazon-muted leading-6 pl-1">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
            {filteredFaqs.length === 0 && (
              <p className="py-4 text-sm text-amazon-muted text-center">
                No matching help articles found for "{searchQuery}".
              </p>
            )}
          </div>
        </div>

        {/* Contact Us demo banner */}
        <div className="mt-8 border border-amazon-border bg-[#e7f4f5] p-6 rounded text-center">
          <h3 className="text-lg font-bold text-amazon-text">Need more help?</h3>
          <p className="mt-1 text-sm text-amazon-muted">Our customer service team is available 24/7 for you.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link to="/profile" className="rounded-full bg-amazon-yellow px-6 py-2.5 text-sm font-semibold text-amazon-text hover:bg-[#f3a847]">
              Contact Us
            </Link>
            <Link to="/" className="rounded-full border border-amazon-border bg-white px-6 py-2.5 text-sm font-semibold text-amazon-text hover:bg-amazon-page">
              Return to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerService
