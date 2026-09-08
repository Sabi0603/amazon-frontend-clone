import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { WishlistProvider } from './context/WishlistProvider.jsx'
import { OrderProvider } from './context/OrderProvider.jsx'
import router from './routes/index.jsx'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <OrderProvider>
              <RouterProvider router={router} />
            </OrderProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
