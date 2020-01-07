import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import PropTypes from 'prop-types';

import Rail, { ProductRail } from '../rail';
import Image from './image';
import Price from './price';

const ProductsItem = ({ data, ...rest }) => {
  const {
    name,
    onSale,
    regularPrice,
    price,
    image,
    galleryImages,
    type,
    shortDescription: description,
    link,
  } = data;

  return (
    <Rail justifyContent="center" direction="column" {...rest}>
      <Image data={{ image, galleryImages }} width="175px" squared noUI />
      <ProductRail
        direction="column"
        height="175px"
        width="175px"
        alignItems="center"
        inline
        shrink
      >
        <a className="product-name" href={link}>
          {onSale && (
            <>
              <span className="badge">On Sale</span>
              <br />
            </>
          )}
          {name}
          {description && (
            <>
              <br />
              {parse(description, {
                replace({ name, children }) {
                  if (name === 'p') {
                    return (
                      <small>{domToReact(children)}</small>
                    )
                  }
                }
              })}
            </>
          )}
          <Price
            type={type}
            onSale={onSale}
            price={price}
            regularPrice={regularPrice}
          />
        </a>
      </ProductRail>
    </Rail>
  );
};

ProductsItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    onSale: PropTypes.bool,
    regularPrice: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.shape({}),
    galleryImages: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({}))
    }),
    type: PropTypes.string,
    shortDescription: PropTypes.string,
  }),
};

ProductsItem.defaultProps = {
  data: {},
  type: 'normal',
};

export default ProductsItem;