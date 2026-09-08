import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart.js'
import { useAuth } from '../../hooks/useAuth.js'

function HeaderIcon({ children, className = 'h-5 w-5', strokeWidth = '1.8' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {children}
    </svg>
  )
}

function AmazonLogo({ compact = false }) {
  return (
    <Link
      className={`flex items-center rounded-sm text-white outline-offset-2 hover:outline-1 hover:outline-white ${
        compact ? 'h-10 min-w-0 flex-1 px-1' : 'h-[52px] min-w-[116px] px-2'
      }`}
      to="/"
      aria-label="Amazon.in home"
    >
      <span
        className={`relative block pb-1 font-bold leading-none ${
          compact ? 'text-[22px] tracking-[-1.4px]' : 'text-[28px] tracking-[-1.8px]'
        }`}
      >
        amazon
        <span className={compact ? 'text-[14px] tracking-[-0.8px]' : 'text-[17px] tracking-[-1px]'}>
          .in
        </span>
        <svg
          aria-hidden="true"
          className={`absolute -bottom-1 text-amazon-orange ${
            compact ? 'left-6 h-2 w-12' : 'left-9 h-2.5 w-[62px]'
          }`}
          viewBox="0 0 56 10"
          fill="none"
        >
          <path
            d="M2 2.5c13 7 31 7 49 1.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
          <path
            d="m45 1 7 3-7 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </svg>
      </span>
    </Link>
  )
}

function LocationButton() {
  return (
    <button
      className="flex h-[52px] min-w-[160px] items-center gap-1 rounded-sm px-2 text-left text-white outline-offset-2 hover:outline-1 hover:outline-white"
      type="button"
      aria-label="Choose delivery location"
    >
      <HeaderIcon className="h-[19px] w-[19px] shrink-0 self-end mb-[11px]">
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </HeaderIcon>
      <span className="min-w-0 pb-1 leading-tight">
        <span className="block text-[12px] leading-4 text-white/75">Deliver to</span>
        <span className="block truncate text-[14px] font-bold leading-4">India</span>
      </span>
    </button>
  )
}

function SearchBar({ compact = false, idPrefix = 'desktop' }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedQuery = query.trim()
    const search = trimmedQuery ? `?${new URLSearchParams({ q: trimmedQuery })}` : ''
    navigate(`/search${search}`)
  }

  return (
    <form
      className={`flex h-10 min-w-0 flex-1 overflow-hidden rounded-[4px] focus-within:ring-2 focus-within:ring-amazon-orange ${
        compact ? 'mx-2' : 'mx-3 min-w-[280px]'
      }`}
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor={`${idPrefix}-search-category`}>
        Search category
      </label>
      <select
        className="w-[54px] shrink-0 cursor-pointer border-r border-amazon-border bg-[#e6e6e6] px-1 text-xs text-[#333] outline-none hover:bg-[#d4d4d4] sm:w-[58px] sm:px-2"
        defaultValue="all"
        id={`${idPrefix}-search-category`}
        aria-label="Search category"
      >
        <option value="all">All</option>
        <option value="appliances">Appliances</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
      </select>
      <label className="sr-only" htmlFor={`${idPrefix}-search-input`}>
        Search Amazon.in
      </label>
      <input
        className="min-w-0 flex-1 bg-white px-2 text-[14px] text-amazon-text outline-none placeholder:text-[#6b7280] sm:px-3 sm:text-[15px]"
        id={`${idPrefix}-search-input`}
        placeholder="Search Amazon.in"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        className="flex w-[48px] shrink-0 items-center justify-center bg-amazon-yellow text-[#111] hover:bg-[#f3a847] sm:w-[50px]"
        type="submit"
        aria-label="Search"
      >
        <HeaderIcon className="h-[22px] w-[22px]" strokeWidth="2.4">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 5 5" strokeLinecap="round" />
        </HeaderIcon>
      </button>
    </form>
  )
}

function LanguageSelector() {
  return (
    <button
      className="flex h-[52px] min-w-[58px] shrink-0 items-center gap-1 rounded-sm px-2 text-white outline-offset-2 hover:outline-1 hover:outline-white"
      type="button"
      aria-label="Choose language"
    >
      <span className="text-[12px] font-bold">EN</span>
      <span aria-hidden="true" className="mt-1 text-[9px] text-white/70">
        ▼
      </span>
    </button>
  )
}

function AccountLink({ compact = false }) {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  return (
    <button
      className={`flex rounded-sm px-2 text-left text-white outline-offset-2 hover:outline-1 hover:outline-white ${
        compact
          ? 'h-10 min-w-[76px] max-w-[94px] flex-col justify-center'
          : 'h-[52px] min-w-[135px] flex-col justify-center'
      }`}
      type="button"
      aria-label={isAuthenticated ? 'Open your account' : 'Sign in to your account'}
      onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
    >
      <span className={compact ? 'truncate text-[10px] leading-3 text-white/85' : 'text-[12px] leading-4 text-white/85'}>
        {isAuthenticated ? `Hello, ${user?.name}` : 'Hello, sign in'}
      </span>
      <span className={`flex items-center gap-1 whitespace-nowrap font-bold leading-4 ${compact ? 'text-[12px]' : 'text-[14px]'}`}>
        {compact ? 'Account' : 'Account & Lists'}
        <span aria-hidden="true" className="text-[9px] text-white/70">
          ▼
        </span>
      </span>
    </button>
  )
}

function ReturnsLink() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <button
      className="flex h-[52px] min-w-[90px] flex-col justify-center rounded-sm px-2 text-left text-white outline-offset-2 hover:outline-1 hover:outline-white"
      type="button"
      aria-label="Returns and Orders"
      onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
    >
      <span className="text-[12px] leading-4 text-white/85">Returns</span>
      <span className="whitespace-nowrap text-[14px] font-bold leading-4">&amp; Orders</span>
    </button>
  )
}

function CartLink({ compact = false }) {
  const navigate = useNavigate()
  const { itemCount } = useCart()

  return (
    <button
      className={`flex rounded-sm text-white outline-offset-2 hover:outline-1 hover:outline-white ${
        compact
          ? 'h-10 min-w-[48px] items-center justify-center px-0'
          : 'h-[52px] min-w-[86px] items-end gap-1 px-1 pb-2'
      }`}
      type="button"
      aria-label={`Cart, ${itemCount} items`}
      onClick={() => navigate('/cart')}
    >
      <span className="relative block">
        <span className={`absolute min-w-5 text-center font-bold leading-none text-amazon-orange ${compact ? '-top-1 left-3 text-[14px]' : '-top-2 left-3 text-[17px]'}`}>
          {itemCount}
        </span>
        <HeaderIcon className={compact ? 'h-7 w-7' : 'h-[31px] w-[31px]'} strokeWidth="1.7">
          <path d="M3 4h2l2.2 13.1a2 2 0 0 0 2 1.7h7.9a2 2 0 0 0 1.9-1.4L21 9H6.2" />
          <circle cx="10" cy="21" r="1" />
          <circle cx="18" cy="21" r="1" />
        </HeaderIcon>
      </span>
      {!compact && <span className="pb-0.5 text-[14px] font-bold">Cart</span>}
    </button>
  )
}

function SecondaryNavigation({ compact = false, onToggleMenu }) {
  const navigate = useNavigate()

  const navigationItems = [
    { label: "Today's Deals", href: '/deals' },
    { label: 'Customer Service', href: '/customer-service' },
    { label: 'Registry', href: '/registry' },
    { label: 'Gift Cards', href: '/gift-cards' },
    { label: 'Sell', href: '/sell' },
  ]

  return (
    <nav
      className={`flex items-center gap-0 bg-amazon-blue px-2 text-white ${
        compact
          ? 'h-10 w-full min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          : 'h-[39px] overflow-hidden'
      }`}
      aria-label="Secondary navigation"
    >
      <button
        className="flex h-8 shrink-0 items-center gap-2 rounded-sm px-2.5 text-sm font-bold outline-offset-2 hover:outline-1 hover:outline-white"
        type="button"
        aria-label="All departments and menu"
        onClick={() => {
          if (onToggleMenu) {
            onToggleMenu()
          } else {
            navigate('/products')
          }
        }}
      >
        <HeaderIcon className="h-[18px] w-[18px]" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </HeaderIcon>
        All
      </button>
      {navigationItems.map((item) => (
        <button
          className={`h-8 shrink-0 rounded-sm font-semibold outline-offset-2 hover:outline-1 hover:outline-white ${
            compact ? 'px-2.5 text-[12px]' : 'px-3 text-[13px]'
          }`}
          key={item.label}
          type="button"
          aria-label={item.label}
          onClick={() => navigate(item.href)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}

function MobileMenu({ open, onClose }) {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  if (!open) {
    return null
  }

  const menuLinks = [
    { label: "Today's Deals", href: '/deals' },
    { label: 'Shop All Products', href: '/products' },
    { label: 'Customer Service', href: '/customer-service' },
    { label: 'Registry', href: '/registry' },
    { label: 'Gift Cards', href: '/gift-cards' },
    { label: 'Sell on Amazon', href: '/sell' },
    { label: isAuthenticated ? 'Your Account' : 'Sign In', href: isAuthenticated ? '/profile' : '/login' },
  ]

  return (
    <nav
      className="absolute left-0 top-14 z-30 w-[min(82vw,280px)] bg-white py-2 text-amazon-text shadow-2xl border-r border-amazon-border"
      aria-label="Mobile navigation menu"
    >
      <div className="flex items-center justify-between border-b border-amazon-border bg-amazon-blue px-5 py-3 text-white">
        <p className="text-sm font-bold truncate">
          {isAuthenticated ? `Hello, ${user?.name}` : 'Hello, sign in'}
        </p>
        <button
          type="button"
          aria-label="Close menu"
          className="text-white hover:text-amazon-orange font-bold text-lg leading-none"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      {menuLinks.map((item) => (
        <button
          className="block w-full px-5 py-3 text-left text-sm hover:bg-[#eaeded] border-b border-amazon-border/30 last:border-b-0"
          key={item.label}
          type="button"
          onClick={() => {
            onClose()
            navigate(item.href)
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative w-full bg-amazon-navy text-white">
      <div className="hidden h-[60px] min-w-0 items-center gap-0 px-1 xl:flex">
        <AmazonLogo />
        <LocationButton />
        <SearchBar idPrefix="desktop" />
        <LanguageSelector />
        <AccountLink />
        <ReturnsLink />
        <CartLink />
      </div>
      <div className="hidden h-[60px] min-w-0 items-center gap-0 px-1 md:flex xl:hidden">
        <AmazonLogo compact />
        <SearchBar compact idPrefix="tablet" />
        <AccountLink compact />
        <CartLink compact />
      </div>
      <div className="flex h-14 items-center px-1 md:hidden">
        <button
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm outline-offset-2 hover:outline-1 hover:outline-white"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <HeaderIcon className="h-6 w-6" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </HeaderIcon>
        </button>
        <AmazonLogo compact />
        <AccountLink compact />
        <CartLink compact />
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="md:hidden">
        <SearchBar compact idPrefix="mobile" />
      </div>
      <div className="hidden md:block xl:hidden">
        <SecondaryNavigation compact onToggleMenu={() => setMenuOpen((o) => !o)} />
      </div>
      <div className="md:hidden">
        <SecondaryNavigation compact onToggleMenu={() => setMenuOpen((o) => !o)} />
      </div>
      <div className="hidden xl:block">
        <SecondaryNavigation onToggleMenu={() => setMenuOpen((o) => !o)} />
      </div>
    </header>
  )
}

export default Header
