import { Link } from 'react-router-dom'

function EmptyState({ title, message, actionLabel, actionTo = '/products', icon, headingLevel = 'h2' }) {
  const Heading = headingLevel

  return (
    <div className="border border-amazon-border bg-amazon-surface p-8 text-center sm:p-12">
      {icon && <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amazon-page text-amazon-blue" aria-hidden="true">{icon}</div>}
      <Heading className="mt-4 text-xl font-bold text-amazon-text">{title}</Heading>
      <p className="mt-2 text-sm text-amazon-muted">{message}</p>
      {actionLabel && (
        <Link className="mt-6 inline-block rounded-full bg-amazon-yellow px-6 py-3 text-sm font-medium text-amazon-text hover:bg-[#f3a847]" to={actionTo}>
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

export default EmptyState
