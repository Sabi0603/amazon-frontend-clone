import electronicsImg from '../assets/categories/electronics.svg'
import homeKitchenImg from '../assets/categories/home_kitchen.svg'
import fashionImg from '../assets/categories/fashion.svg'
import mobilesImg from '../assets/categories/mobiles.svg'
import beautyImg from '../assets/categories/beauty.svg'
import booksImg from '../assets/categories/books.svg'
import groceryImg from '../assets/categories/grocery.svg'
import appliancesImg from '../assets/categories/appliances.svg'

import dealHeadphones from '../assets/products/prod-001.jpg'
import dealKettle from '../assets/products/prod-007.jpg'
import dealShirt from '../assets/products/prod-009.jpg'
import dealKeyboard from '../assets/products/prod-002.jpg'
import dealFaceWash from '../assets/products/prod-011.jpg'
import dealBook from '../assets/products/prod-013.svg'

import promoWorkspace from '../assets/promotions/promo_workspace.svg'
import promoFashion from '../assets/promotions/promo_fashion.svg'
import promoHome from '../assets/promotions/promo_home.svg'

import { products } from './products.js'

export const homeCategories = [
  {
    title: 'Electronics',
    description: 'Headphones, accessories and more',
    image: electronicsImg,
    visualClass: 'bg-[linear-gradient(135deg,#dbeafe,#93c5fd)]',
  },
  {
    title: 'Home & Kitchen',
    description: 'Make every room work harder',
    image: homeKitchenImg,
    visualClass: 'bg-[linear-gradient(135deg,#fef3c7,#fbbf24)]',
  },
  {
    title: 'Fashion',
    description: 'Styles for every occasion',
    image: fashionImg,
    visualClass: 'bg-[linear-gradient(135deg,#fce7f3,#f9a8d4)]',
  },
  {
    title: 'Mobiles',
    description: 'Smart picks for every budget',
    image: mobilesImg,
    visualClass: 'bg-[linear-gradient(135deg,#e0e7ff,#a5b4fc)]',
  },
  {
    title: 'Beauty',
    description: 'Personal care favourites',
    image: beautyImg,
    visualClass: 'bg-[linear-gradient(135deg,#fce7f3,#fda4af)]',
  },
  {
    title: 'Books',
    description: 'Stories, learning and ideas',
    image: booksImg,
    visualClass: 'bg-[linear-gradient(135deg,#e2e8f0,#94a3b8)]',
  },
  {
    title: 'Grocery',
    description: 'Everyday essentials at home',
    image: groceryImg,
    visualClass: 'bg-[linear-gradient(135deg,#dcfce7,#86efac)]',
  },
  {
    title: 'Appliances',
    description: 'Upgrade your everyday routine',
    image: appliancesImg,
    visualClass: 'bg-[linear-gradient(135deg,#cffafe,#67e8f9)]',
  },
]

export const deals = [
  {
    title: 'Wireless audio for work and travel',
    price: '₹1,499',
    originalPrice: '₹3,990',
    discount: '62% off',
    image: dealHeadphones,
    visualClass: 'bg-[linear-gradient(145deg,#172554,#2563eb)]',
    badge: 'Limited time deal',
  },
  {
    title: 'Smart everyday kitchen essentials',
    price: '₹899',
    originalPrice: '₹1,495',
    discount: '40% off',
    image: dealKettle,
    visualClass: 'bg-[linear-gradient(145deg,#431407,#ea580c)]',
    badge: 'Deal of the day',
  },
  {
    title: 'Comfort-first styles for the season',
    price: '₹899',
    originalPrice: '₹1,999',
    discount: '55% off',
    image: dealShirt,
    visualClass: 'bg-[linear-gradient(145deg,#500724,#db2777)]',
    badge: 'Up to 55% off',
  },
  {
    title: 'Make your home office work better',
    price: '₹2,299',
    originalPrice: '₹3,495',
    discount: '34% off',
    image: dealKeyboard,
    visualClass: 'bg-[linear-gradient(145deg,#164e63,#0891b2)]',
    badge: 'Limited time deal',
  },
  {
    title: 'Daily personal care favourites',
    price: '₹349',
    originalPrice: '₹499',
    discount: '30% off',
    image: dealFaceWash,
    visualClass: 'bg-[linear-gradient(145deg,#4c1d95,#a78bfa)]',
    badge: 'Great offer',
  },
  {
    title: 'Fresh picks for curious readers',
    price: '₹299',
    originalPrice: '₹499',
    discount: '40% off',
    image: dealBook,
    visualClass: 'bg-[linear-gradient(145deg,#14532d,#22c55e)]',
    badge: 'Deal of the day',
  },
]

export const recommendedProducts = [
  products.find(p => p.id === 'prod-001') || products[0],
  products.find(p => p.id === 'prod-021') || products[1],
  products.find(p => p.id === 'prod-005') || products[2],
  products.find(p => p.id === 'prod-008') || products[3],
  products.find(p => p.id === 'prod-014') || products[4],
]

export const promotionalContent = [
  {
    title: 'Refresh your workspace',
    description: 'Useful upgrades for productive days.',
    image: promoWorkspace,
    visualClass: 'bg-[linear-gradient(135deg,#dbeafe,#60a5fa)]',
  },
  {
    title: 'Style for every season',
    description: 'Discover new looks and everyday essentials.',
    image: promoFashion,
    visualClass: 'bg-[linear-gradient(135deg,#fce7f3,#f472b6)]',
  },
  {
    title: 'Smart choices for your home',
    description: 'Small changes that make a difference.',
    image: promoHome,
    visualClass: 'bg-[linear-gradient(135deg,#dcfce7,#4ade80)]',
  },
]
