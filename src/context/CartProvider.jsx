import { useEffect, useMemo, useState } from 'react'
import CartContext from './CartContext.jsx'
import { getStoredData, setStoredData, STORAGE_KEYS } from '../utils/storage.js'

function calculateItemCount(items) {
  return items.reduce((total, item) => total + item.quantity, 0)
}

function calculateSubtotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => getStoredData(STORAGE_KEYS.CART, []))
  useEffect(() => {
    setStoredData(STORAGE_KEYS.CART, cartItems)
  }, [cartItems])
  const addItem = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentItems, { ...product, images: [...product.images], quantity: 1 }]
    })
  }

  const removeItem = (productId) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    const nextQuantity = Math.max(1, Number(quantity) || 1)

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    )
  }

  const clearCart = () => setCartItems([])

  const { itemCount, subtotal } = useMemo(
    () => ({
      itemCount: calculateItemCount(cartItems),
      subtotal: calculateSubtotal(cartItems),
    }),
    [cartItems],
  )

  return (
    <CartContext.Provider
      value={{
        addItem,
        cartItems,
        clearCart,
        itemCount,
        removeItem,
        subtotal,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider }