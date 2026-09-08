import { useState } from 'react'
import OrderContext from './OrderContext.jsx'
import { getStoredData, removeStoredData, setStoredData, STORAGE_KEYS } from '../utils/storage.js'

function OrderProvider({ children }) {
  const [latestOrder, setLatestOrder] = useState(() => getStoredData(STORAGE_KEYS.ORDER, null))

  const createOrder = (order) => {
    setLatestOrder(order)
    setStoredData(STORAGE_KEYS.ORDER, order)
    return order
  }

  const clearLatestOrder = () => {
    setLatestOrder(null)
    removeStoredData(STORAGE_KEYS.ORDER)
  }

  return (
    <OrderContext.Provider value={{ clearLatestOrder, createOrder, latestOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export { OrderProvider }
