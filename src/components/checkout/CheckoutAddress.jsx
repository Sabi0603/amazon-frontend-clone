function CheckoutAddress({ address, errors, onChange }) {
  const fields = [
    ['fullName', 'Full name', 'text'],
    ['mobile', 'Mobile number', 'tel'],
    ['address', 'Address', 'text'],
    ['city', 'City', 'text'],
    ['state', 'State', 'text'],
    ['pinCode', 'PIN code', 'text'],
  ]

  return (
    <section className="border border-amazon-border bg-amazon-surface p-5 sm:p-6" aria-labelledby="delivery-heading">
      <h2 id="delivery-heading" className="text-xl font-normal text-amazon-text">1. Delivery address</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {fields.map(([key, label, type]) => (
          <label className={key === 'address' ? 'sm:col-span-2' : ''} htmlFor={`checkout-${key}`} key={key}>
            <span className="block text-sm font-bold text-amazon-text">{label}</span>
            <input
              className={`mt-2 min-h-11 w-full rounded border px-3 text-sm outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30 ${errors[key] ? 'border-[#b12704]' : 'border-[#888]'}`}
              id={`checkout-${key}`}
              type={type}
              value={address[key]}
              onChange={(event) => onChange(key, event.target.value)}
            />
            {errors[key] && <span className="mt-1 block text-xs text-[#b12704]">{errors[key]}</span>}
          </label>
        ))}
      </div>
    </section>
  )
}

export default CheckoutAddress
