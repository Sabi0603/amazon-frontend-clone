import { useNavigate } from 'react-router-dom'
import AccountSection from '../components/profile/AccountSection.jsx'
import ProfileCard from '../components/profile/ProfileCard.jsx'
import { useAuth } from '../hooks/useAuth.js'

function Profile() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-amazon-page py-8">
      <div className="page-container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-normal text-amazon-text">Your Account</h1>
          <button className="rounded border border-amazon-border bg-amazon-surface px-4 py-2 text-sm hover:bg-[#f7f8f8]" type="button" onClick={handleLogout}>
            Sign out
          </button>
        </div>
        <div className="mt-6">
          <ProfileCard user={user} />
        </div>
        <section className="mt-8" aria-labelledby="account-sections-heading">
          <h2 id="account-sections-heading" className="mb-4 text-2xl font-normal text-amazon-text">Your account</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AccountSection title="Your Orders" description="Track, return, or buy things again." disabled />
            <AccountSection title="Login & Security" description="Manage your name, password, and sign-in details." disabled />
            <AccountSection title="Your Addresses" description="Manage addresses for delivery and billing." disabled />
            <AccountSection title="Payment Options" description="Manage your payment methods and preferences." disabled />
            <AccountSection href="/wishlist" title="Your Wishlist" description="View and manage products you want to save." />
            <AccountSection href="/cart" title="Your Cart" description="Review items waiting in your shopping cart." />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Profile
