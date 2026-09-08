import { useEffect, useMemo, useState } from 'react'
import WishlistContext from './WishlistContext.jsx'
import { getStoredData, setStoredData, STORAGE_KEYS } from '../utils/storage.js'

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => getStoredData(STORAGE_KEYS.WISHLIST, []))
  useEffect(() => {
    setStoredData(STORAGE_KEYS.WISHLIST, wishlistItems)
  }, [wishlistItems])
  const addItem = (product) => {
    setWishlistItems((currentItems) => {
      if (currentItems.some((item) => item.id === product.id)) {
        return currentItems
      }

      return [...currentItems, { ...product, images: [...product.images] }]
    })
  }

  const removeItem = (productId) => {
    setWishlistItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }

  const toggleItem = (product) => {
    setWishlistItems((currentItems) => {
      if (currentItems.some((item) => item.id === product.id)) {
        return currentItems.filter((item) => item.id !== product.id)
      }

      return [...currentItems, { ...product, images: [...product.images] }]
    })
  }

  const clearWishlist = () => setWishlistItems([])
  const isWishlisted = (productId) => wishlistItems.some((item) => item.id === productId)
  const itemCount = useMemo(() => wishlistItems.length, [wishlistItems])

  return (
    <WishlistContext.Provider
      value={{
        addItem,
        clearWishlist,
        isWishlisted,
        itemCount,
        removeItem,
        toggleItem,
        wishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export { WishlistProvider }