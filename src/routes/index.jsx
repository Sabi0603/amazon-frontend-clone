import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'
import ProtectedRoute from '../components/common/ProtectedRoute.jsx'
import Cart from '../pages/Cart.jsx'
import Checkout from '../pages/Checkout.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import OrderConfirmation from '../pages/OrderConfirmation.jsx'
import ProductDetails from '../pages/ProductDetails.jsx'
import Products from '../pages/Products.jsx'
import Profile from '../pages/Profile.jsx'
import Register from '../pages/Register.jsx'
import SearchResults from '../pages/SearchResults.jsx'
import Wishlist from '../pages/Wishlist.jsx'
import Deals from '../pages/Deals.jsx'
import CustomerService from '../pages/CustomerService.jsx'
import Registry from '../pages/Registry.jsx'
import GiftCards from '../pages/GiftCards.jsx'
import Sell from '../pages/Sell.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:productId', element: <ProductDetails /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'deals', element: <Deals /> },
      { path: 'todays-deals', element: <Deals /> },
      { path: 'customer-service', element: <CustomerService /> },
      { path: 'registry', element: <Registry /> },
      { path: 'gift-cards', element: <GiftCards /> },
      { path: 'sell', element: <Sell /> },
      { path: 'cart', element: <Cart /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'checkout', element: <Checkout /> },
          { path: 'order-confirmation', element: <OrderConfirmation /> },
        ],
      },
    ],
  },
])

export default router
