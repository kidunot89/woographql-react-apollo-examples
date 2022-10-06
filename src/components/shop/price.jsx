// products/price.jsx
import React from 'react';
import clsx from 'clsx';

const ProductPrice = ({ onSale, regularPrice, price, type }) => {
  const className = clsx(
    'mt-0.5 mx-0.5 mb-0 text-sm text-shark',
    'group-hover:text-shark-900',
  );

  if (onSale && type !== 'VARIABLE') {
    return (<p className={className}><span className="line-through text-lynch group-hover:text-blue-bayoux">{regularPrice}</span> {price}</p>);
  }

  return (
    <p className={className}>{price}</p>
  );
};

export default ProductPrice;
