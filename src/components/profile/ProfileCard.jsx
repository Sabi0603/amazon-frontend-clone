function ProfileCard({ user }) {
  const displayName = user?.name || 'Amazon customer'
  const identifier = user?.email || 'Account details unavailable'

  return (
    <section className="border border-amazon-border bg-amazon-surface p-5 sm:p-6" aria-labelledby="profile-welcome">
      <p className="text-xs font-bold uppercase tracking-wide text-amazon-muted">Welcome</p>
      <h2 id="profile-welcome" className="mt-2 text-2xl font-normal text-amazon-text">
        {displayName}
      </h2>
      <p className="mt-2 text-sm text-amazon-muted">{identifier}</p>
    </section>
  )
}

export default ProfileCard
