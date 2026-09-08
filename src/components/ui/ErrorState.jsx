function ErrorState({ message = 'Something went wrong.', actionLabel, onAction }) {
  return (
    <div className="border border-[#e7b5aa] bg-[#fff8f6] p-6 text-sm text-[#b12704]" role="alert">
      <p>{message}</p>
      {actionLabel && onAction && (
        <button className="mt-4 font-bold text-amazon-link hover:underline" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default ErrorState
