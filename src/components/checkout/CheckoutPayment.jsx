function CheckoutPayment({ payment, errors, onChange }) {
  const methods = [
    ['cod', 'Cash on Delivery'],
    ['upi', 'UPI'],
    ['card', 'Credit/Debit Card'],
  ]

  return (
    <section className="border border-amazon-border bg-amazon-surface p-5 sm:p-6" aria-labelledby="payment-heading">
      <h2 id="payment-heading" className="text-xl font-normal text-amazon-text">2. Payment method</h2>
      <div className="mt-5 space-y-3">
        {methods.map(([value, label]) => (
          <label className="flex items-center gap-3 text-sm text-amazon-text" key={value}>
            <input
              checked={payment.method === value}
              className="accent-amazon-orange"
              name="payment-method"
              type="radio"
              value={value}
              onChange={(event) => onChange('method', event.target.value)}
            />
            {label}
          </label>
        ))}
      </div>
      {payment.method === 'upi' && (
        <label className="mt-5 block text-sm font-bold text-amazon-text" htmlFor="upi-id">
          UPI ID
          <input
            className={`mt-2 min-h-11 w-full rounded border px-3 font-normal outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30 ${errors.upi ? 'border-[#b12704]' : 'border-[#888]'}`}
            id="upi-id"
            placeholder="name@bank"
            type="text"
            value={payment.upi}
            onChange={(event) => onChange('upi', event.target.value)}
          />
          {errors.upi && <span className="mt-1 block text-xs font-normal text-[#b12704]">{errors.upi}</span>}
        </label>
      )}
      {payment.method === 'card' && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2 text-sm font-bold text-amazon-text" htmlFor="card-number">
            Card number
            <input className={`mt-2 min-h-11 w-full rounded border px-3 font-normal outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30 ${errors.cardNumber ? 'border-[#b12704]' : 'border-[#888]'}`} id="card-number" inputMode="numeric" type="text" value={payment.cardNumber} onChange={(event) => onChange('cardNumber', event.target.value)} />
            {errors.cardNumber && <span className="mt-1 block text-xs font-normal text-[#b12704]">{errors.cardNumber}</span>}
          </label>
          <label className="text-sm font-bold text-amazon-text" htmlFor="card-expiry">
            Expiry
            <input className={`mt-2 min-h-11 w-full rounded border px-3 font-normal outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30 ${errors.expiry ? 'border-[#b12704]' : 'border-[#888]'}`} id="card-expiry" placeholder="MM/YY" type="text" value={payment.expiry} onChange={(event) => onChange('expiry', event.target.value)} />
            {errors.expiry && <span className="mt-1 block text-xs font-normal text-[#b12704]">{errors.expiry}</span>}
          </label>
          <label className="text-sm font-bold text-amazon-text" htmlFor="card-cvv">
            CVV
            <input className={`mt-2 min-h-11 w-full rounded border px-3 font-normal outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30 ${errors.cvv ? 'border-[#b12704]' : 'border-[#888]'}`} id="card-cvv" inputMode="numeric" type="password" value={payment.cvv} onChange={(event) => onChange('cvv', event.target.value)} />
            {errors.cvv && <span className="mt-1 block text-xs font-normal text-[#b12704]">{errors.cvv}</span>}
          </label>
        </div>
      )}
      <p className="mt-5 text-xs text-amazon-muted">Demo payment only. No payment details are processed or stored.</p>
    </section>
  )
}

export default CheckoutPayment
