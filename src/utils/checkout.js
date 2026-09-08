export function calculateShipping(subtotal) {
  return subtotal >= 500 ? 0 : 40
}

export function formatINR(value) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}
