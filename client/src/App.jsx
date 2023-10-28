import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login, Signup, Product, Cart, Dashboard, Bookmarks, PaymentSuccess, PaymentFailure } from './pages';

const App = () => (
  <BrowserRouter>
    <main className="sm:p-8 px-4 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/:uid/dashboard" element={<Dashboard />} />
        <Route path="/user/:uid/product/:pid" element={<Product />} />
        <Route path="/user/:uid/wishlists" element={<Bookmarks />} />
        <Route path="/user/:uid/cart" element={<Cart />} />
        <Route path="/user/:uid/payment-successful" element={<PaymentSuccess />} />
        <Route path="/user/:uid/payment-cancelled" element={<PaymentFailure />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;