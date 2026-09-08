export const STORAGE_KEYS = {
  AUTH: 'amazon-clone-auth',
  CART: 'amazon-clone-cart',
  ORDER: 'amazon-clone-order',
  WISHLIST: 'amazon-clone-wishlist',
}

export function getStoredData(key, fallback) {
  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

export function setStoredData(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return false
  }

  return true
}

export function removeStoredData(key) {
  try {
    window.localStorage.removeItem(key)
  } catch {
    return false
  }

  return true
}
