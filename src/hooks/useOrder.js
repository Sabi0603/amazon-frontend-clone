import { useContext } from 'react'
import OrderContext from '../context/OrderContext.jsx'

export function useOrder() {
  const context = useContext(OrderContext)

  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider')
  }

  return context
}
