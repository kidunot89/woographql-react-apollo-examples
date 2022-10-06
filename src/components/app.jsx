// app.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Shop from './shop';
import Product from './product';
import Cart from './cart';
import SessionProvider from './session-provider';
import Navigation from './navigation';

const App = () => {
  return (
    <SessionProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Shop first={5} />} />
        <Route path="/product/:uri" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </SessionProvider>
  );
};

export default App;
