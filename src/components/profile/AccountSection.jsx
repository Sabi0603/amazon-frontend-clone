import { Link } from 'react-router-dom'

function AccountSection({ title, description, href, disabled = false }) {
  const content = (
    <>
      <h2 className="text-lg font-normal text-amazon-text">{title}</h2>
      <p className="mt-2 text-sm leading-5 text-amazon-muted">{description}</p>
      <span className={`mt-4 inline-block text-sm ${disabled ? 'text-amazon-muted' : 'text-amazon-link'}`}>
        {disabled ? 'Coming soon' : 'View details'}
      </span>
    </>
  )

  if (disabled) {
    return (
      <article className="border border-amazon-border bg-amazon-surface p-5 opacity-75 sm:p-6">
        {content}
      </article>
    )
  }

  return (
    <Link className="block border border-amazon-border bg-amazon-surface p-5 outline-offset-2 hover:bg-[#f7f8f8] sm:p-6" to={href}>
      {content}
    </Link>
  )
}

export default AccountSection
