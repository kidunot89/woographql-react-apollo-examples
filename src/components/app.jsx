// app.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductsList from './products';
// import Product from './product';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsList first={5} width="960px" itemWidth="320px" />} />
      {/* <Route path="/product/:uri" element={<Product />} /> */}
    </Routes>
  );
};

export default App;
