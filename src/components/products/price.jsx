// products/price.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ProductPrice = ({ onSale, regularPrice, price, type }) => {
  if (onSale) {
    return type === 'VARIABLE'
      ? (<p className="product-price">{price}</p>)
      : (<p className="product-price"><span className="regular-price">{regularPrice}</span> {price}</p>);
  }

  return (
    <p className="product-price">{price}</p>
  );
};

ProductPrice.propTypes = {
  price: PropTypes.string,
  regularPrice: PropTypes.string,
  salePrice: PropTypes.string,
  onSale: PropTypes.bool,
};

ProductPrice.defaultProps = {
  price: 'Free',
  regularPrice: 'Free',
  salePrice: 'Free',
  onSale: false,
};

export default ProductPrice;
