import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.js';
import Search from './components/Search.js';
import ProductDetails from './components/Productdetails.js';
import UserAuth from './components/UserAuth';
import CartPage from './components/CartPage';
import Checkout from './components/Checkout';
import MyOrders from './components/MyOrders';
import Category from './components/Category';
import Header from './components/Header';

function App() {
  return (
      <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/details/:productId" element={<ProductDetails />} />
        <Route path="/user-auth" element={<UserAuth />} />
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/category/:categoryName" element={<Category />} />
      </Routes>
    </Router>
  );
}

export default App;
// This is the main entry point of the application.
// It sets up the router and defines the routes for different pages.
// The Header component is included on all pages for consistent navigation.
// The application includes routes for home, search, product details, user authentication, cart page, checkout, my orders, and category pages.
// Each route corresponds to a specific component that handles the logic and rendering for that page.
// The Home component displays the main page with featured products.
