function Section({ children, className = '', container = true, label }) {
  return (
    <section aria-label={label} className={`content-section ${className}`}>
      {container ? <div className="page-container">{children}</div> : children}
    </section>
  )
}

export default Section
