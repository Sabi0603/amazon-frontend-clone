import { useState } from 'react'
import { Link } from 'react-router-dom'

function Registry() {
  const [created, setCreated] = useState(false)
  const [registryType, setRegistryType] = useState('wedding')
  const [name, setName] = useState('')

  const types = [
    { id: 'wedding', title: 'Wedding Registry', icon: '💍', desc: 'Celebrate your union with gifts you will love for years.' },
    { id: 'baby', title: 'Baby Registry', icon: '👶', desc: 'Everything you need to welcome your bundle of joy.' },
    { id: 'birthday', title: 'Birthday & Milestone', icon: '🎂', desc: 'Create a wishlist for birthdays, graduations and housewarmings.' },
    { id: 'custom', title: 'Custom Gift List', icon: '🎁', desc: 'A universal list for any occasion or life celebration.' },
  ]

  function handleCreate(e) {
    e.preventDefault()
    if (!name.trim()) return
    setCreated(true)
  }

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-8">
      <div className="page-container max-w-5xl">
        <nav aria-label="Breadcrumb" className="text-xs text-amazon-muted mb-4">
          <Link className="text-amazon-link hover:underline" to="/">Home</Link>
          <span className="px-2" aria-hidden="true">&gt;</span>
          <span>Registry</span>
        </nav>

        {/* Hero banner */}
        <div className="border border-amazon-border bg-gradient-to-r from-[#232f3e] to-[#37475a] p-6 sm:p-12 text-white rounded">
          <span className="text-xs font-bold uppercase tracking-wider text-amazon-yellow">Amazon Registry</span>
          <h1 className="mt-2 text-2xl sm:text-4xl font-bold">
            Celebrate life's big moments together
          </h1>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-white/85 leading-relaxed">
            Create a registry for weddings, babies, or any celebration. Share with friends and family across India with ease.
          </p>
        </div>

        {/* Registry Types */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-amazon-text mb-4">Select a Registry Type</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {types.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`border p-5 rounded text-left transition-all bg-amazon-surface ${
                  registryType === t.id
                    ? 'border-amazon-orange ring-2 ring-amazon-orange/40 shadow-md'
                    : 'border-amazon-border hover:border-amazon-muted'
                }`}
                onClick={() => {
                  setRegistryType(t.id)
                  setCreated(false)
                }}
              >
                <span className="text-3xl" aria-hidden="true">{t.icon}</span>
                <h3 className="mt-3 text-base font-bold text-amazon-text">{t.title}</h3>
                <p className="mt-1 text-xs text-amazon-muted leading-relaxed">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Create Form */}
        <div className="mt-8 border border-amazon-border bg-amazon-surface p-6 sm:p-8 rounded">
          <h2 className="text-xl font-bold text-amazon-text">
            Create your {types.find(t => t.id === registryType)?.title}
          </h2>
          <p className="mt-1 text-sm text-amazon-muted">
            Get started by entering your name and celebration date.
          </p>

          {created ? (
            <div className="mt-6 border border-[#b7d7b9] bg-[#f3fff3] p-5 rounded">
              <p className="text-sm font-bold text-[#007600]">Registry Created Successfully!</p>
              <p className="mt-1 text-sm text-amazon-text">
                Your registry for <strong>{name}</strong> ({types.find(t => t.id === registryType)?.title}) has been initialized.
              </p>
              <div className="mt-4 flex gap-3">
                <Link to="/products" className="rounded-full bg-amazon-yellow px-5 py-2 text-xs font-bold text-amazon-text hover:bg-[#f3a847]">
                  Browse &amp; Add Gifts
                </Link>
                <button
                  type="button"
                  className="rounded-full border border-amazon-border px-4 py-2 text-xs text-amazon-text hover:bg-amazon-page"
                  onClick={() => setCreated(false)}
                >
                  Create Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreate} className="mt-6 max-w-md space-y-4">
              <div>
                <label className="block text-xs font-bold text-amazon-text mb-1" htmlFor="reg-name">
                  Your Full Name
                </label>
                <input
                  id="reg-name"
                  type="text"
                  required
                  placeholder="e.g. Priya &amp; Rahul"
                  className="w-full rounded border border-[#888] px-3 py-2 text-sm outline-none focus:border-amazon-focus"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-amazon-text mb-1" htmlFor="reg-date">
                  Event Date
                </label>
                <input
                  id="reg-date"
                  type="date"
                  className="w-full rounded border border-[#888] px-3 py-2 text-sm outline-none focus:border-amazon-focus"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-amazon-yellow px-6 py-2.5 text-sm font-bold text-amazon-text hover:bg-[#f3a847]"
              >
                Create Registry
              </button>
            </form>
          )}
        </div>

        {/* Benefits */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-amazon-border bg-amazon-surface p-5 rounded">
            <h3 className="text-base font-bold text-amazon-text">Universal Wishlist</h3>
            <p className="mt-2 text-xs text-amazon-muted leading-relaxed">
              Add any item from millions of products across electronics, home, appliances and more.
            </p>
          </div>
          <div className="border border-amazon-border bg-amazon-surface p-5 rounded">
            <h3 className="text-base font-bold text-amazon-text">10% Completion Bonus</h3>
            <p className="mt-2 text-xs text-amazon-muted leading-relaxed">
              Enjoy a 10% discount on any remaining items left on your registry after your event.
            </p>
          </div>
          <div className="border border-amazon-border bg-amazon-surface p-5 rounded">
            <h3 className="text-base font-bold text-amazon-text">Easy Returns</h3>
            <p className="mt-2 text-xs text-amazon-muted leading-relaxed">
              Extended 90-day returns on registry items so you have peace of mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registry
