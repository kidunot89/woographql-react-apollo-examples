// price.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ProductPrice = ({ data }) => {
  const { onSale, regularPrice, price, type } = data;
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
  data: PropTypes.shape({
    price: PropTypes.string,
    regularPrice: PropTypes.string,
    salePrice: PropTypes.string,
    onSale: PropTypes.bool,
  }),
};

ProductPrice.defaultProps = {
  data: {
    price: 'Free',
    regularPrice: 'Free',
    salePrice: 'Free',
    onSale: false,
  },
};

export default ProductPrice;
