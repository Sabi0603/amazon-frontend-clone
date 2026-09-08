# Amazon Frontend Clone

A modern Amazon-inspired e-commerce frontend built with React and Vite. The project focuses on recreating a complete shopping experience with reusable components, client-side routing, authentication flows, product browsing, wishlist, cart, checkout, orders, and responsive UI.

## Features

- Amazon-inspired home page and navigation
- Product listing and product details pages
- Search results
- Deals and Today's Deals pages
- Customer Service, Registry, Gift Cards, and Sell pages
- User registration and login flows
- Protected profile and checkout routes
- Wishlist management
- Shopping cart management
- Checkout flow
- Order confirmation and order state management
- Light/dark theme support
- Reusable React components and context providers
- Responsive frontend architecture

## Tech Stack

- React 19
- Vite
- React Router DOM 7
- Tailwind CSS 4
- JavaScript (ES Modules)
- ESLint

## Project Structure

```text
src/
├── components/      # Reusable UI and layout components
├── context/         # Authentication, cart, theme, wishlist and order state
├── pages/           # Application pages
├── routes/          # React Router configuration
├── App.jsx          # Application root and providers
└── main.jsx         # Application entry point
```

## Main Routes

| Route | Purpose |
|---|---|
| `/` | Home |
| `/products` | Product listing |
| `/products/:productId` | Product details |
| `/search` | Search results |
| `/deals` | Deals |
| `/cart` | Shopping cart |
| `/wishlist` | Wishlist |
| `/login` | Login |
| `/register` | Registration |
| `/profile` | Protected user profile |
| `/checkout` | Protected checkout |
| `/order-confirmation` | Protected order confirmation |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sabi0603/amazon-frontend-clone.git
cd amazon-frontend-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Run linting

```bash
npm run lint
```

## Project Goal

This project is part of my frontend development journey and is focused on practicing real-world React application architecture, reusable components, routing, state management with Context API, authentication flows, and e-commerce user experiences.

## Author

**Sabari M**

MERN Stack Developer

[GitHub](https://github.com/Sabi0603)
