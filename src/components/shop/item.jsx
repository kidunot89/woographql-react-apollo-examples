import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import Image from './image';
import Price from './price';

const ProductsItem = ({ data, className, ...rest }) => {
  const {
    uri,
    name,
    onSale,
    regularPrice,
    price,
    image,
    galleryImages,
    type,
    shortDescription: description,
    buttonText,
  } = data;

  return (
    <Link
      className={clsx(
        className && className,
        "flex flex-col justify-center no-underline group"
      )}
      to={uri}
      {...rest}
    >
      <Image
        className="w-44"
        data={{ image, galleryImages }}
      />
      <div
        className="inline-flex flex-col justify-center items-center shrink w-44 h-44"
      >
        <div className={clsx(
          'mt-0.5 mx-0.5 mb-0',
          'text-base text-center transition-colors duration-500',
          'group-hover:text-persian-green',
        )}>
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
                      <small className="text-lynch">{domToReact(children)}</small>
                    )
                  }
                }
              })}
            </>
          )}
          {price && (
            <Price
              type={type}
              onSale={onSale}
              price={price}
              regularPrice={regularPrice}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

ProductsItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    uri: PropTypes.string,
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