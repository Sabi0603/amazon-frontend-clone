function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="border border-amazon-border bg-amazon-surface p-6 text-sm text-amazon-muted" role="status" aria-live="polite">
      <span className="inline-flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amazon-orange" aria-hidden="true" />
        {message}
      </span>
    </div>
  )
}

export default LoadingState
