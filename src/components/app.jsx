// app.js
import React from 'react';
import ProductsList from './products';

const App = () => {
  return <ProductsList first={5} width="960px" itemWidth="320px" />
};

export default App;
