import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckoutAddress from '../components/checkout/CheckoutAddress.jsx'
import CheckoutPayment from '../components/checkout/CheckoutPayment.jsx'
import CheckoutReview from '../components/checkout/CheckoutReview.jsx'
import CheckoutSummary from '../components/checkout/CheckoutSummary.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useCart } from '../hooks/useCart.js'
import { useOrder } from '../hooks/useOrder.js'
import { calculateShipping } from '../utils/checkout.js'

const initialAddress = {
  address: '',
  city: '',
  fullName: '',
  mobile: '',
  pinCode: '',
  state: '',
}

const initialPayment = {
  cardNumber: '',
  cvv: '',
  expiry: '',
  method: 'cod',
  upi: '',
}

function Checkout() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cartItems, clearCart, itemCount, subtotal } = useCart()
  const { createOrder } = useOrder()
  const [address, setAddress] = useState(initialAddress)
  const [payment, setPayment] = useState(initialPayment)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-amazon-page py-8 sm:py-12">
        <div className="page-container">
          <EmptyState actionLabel="View cart" actionTo="/cart" headingLevel="h1" message="Add an item to your cart before checking out." title="Your checkout is empty" />
        </div>
      </div>
    )
  }

  const shipping = calculateShipping(subtotal)

  function updateAddress(key, value) {
    setAddress((current) => ({ ...current, [key]: value }))
  }

  function updatePayment(key, value) {
    setPayment((current) => ({ ...current, [key]: value }))
  }

  function validate() {
    const nextErrors = {}
    const requiredAddressFields = ['fullName', 'mobile', 'address', 'city', 'state', 'pinCode']

    requiredAddressFields.forEach((field) => {
      if (!address[field].trim()) {
        nextErrors[field] = 'Required'
      }
    })

    if (address.mobile && !/^\d{10}$/.test(address.mobile.replace(/\D/g, ''))) {
      nextErrors.mobile = 'Enter a valid 10-digit mobile number'
    }
    if (address.pinCode && !/^\d{6}$/.test(address.pinCode.trim())) {
      nextErrors.pinCode = 'Enter a valid 6-digit PIN code'
    }
    if (payment.method === 'upi' && !/^[^\s@]+@[^\s@]+$/.test(payment.upi.trim())) {
      nextErrors.upi = 'Enter a valid demo UPI ID'
    }
    if (payment.method === 'card') {
      if (!/^\d{12,19}$/.test(payment.cardNumber.replace(/\s/g, ''))) nextErrors.cardNumber = 'Enter a valid card number'
      if (!/^\d{2}\/\d{2}$/.test(payment.expiry.trim())) nextErrors.expiry = 'Use MM/YY format'
      if (!/^\d{3,4}$/.test(payment.cvv.trim())) nextErrors.cvv = 'Enter a valid CVV'
    }

    return nextErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    const order = {
      createdAt: new Date().toISOString(),
      id: `AMZ-${Date.now()}`,
      items: cartItems.map((item) => ({ ...item, images: [...item.images] })),
      paymentMethod: payment.method,
      shipping,
      shippingAddress: { ...address },
      status: 'confirmed',
      subtotal,
      total: subtotal + shipping,
      userId: user?.email || user?.name || 'mock-user',
    }

    createOrder(order)
    clearCart()
    navigate('/order-confirmation')
  }

  return (
    <div className="min-h-screen bg-amazon-page py-4 sm:py-6">
      <div className="page-container">
        <h1 className="text-2xl font-normal text-amazon-text sm:text-3xl">Checkout</h1>
        <form className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]" id="checkout-form" onSubmit={handleSubmit}>
          <div className="grid gap-5">
            <CheckoutAddress address={address} errors={errors} onChange={updateAddress} />
            <CheckoutPayment errors={errors} payment={payment} onChange={updatePayment} />
            <CheckoutReview items={cartItems} />
            {Object.keys(errors).length > 0 && (
              <p className="text-sm text-[#b12704]" role="alert">Review the highlighted fields before placing your order.</p>
            )}
          </div>
          <CheckoutSummary itemCount={itemCount} shipping={shipping} subtotal={subtotal} submitting={submitting} />
        </form>
      </div>
    </div>
  )
}

export default Checkout
