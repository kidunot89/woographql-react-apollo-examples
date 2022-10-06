import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Returns the proper width for the image.
 * 
 * @param {*} props 
 */
function getWidth(props, raw = false) {
  const {
    thumbnail,
    small,
    medium,
    large,
    width,
  } = props;

  let output;
  switch (true) {
    case thumbnail:
      output = '128px';
      break;
    case small:
      output = '240px';
      break;
    case medium:
      output = '512px';
      break;
    case large:
      output = '764px';
      break;
    case width && typeof width === 'string':
      output = width;
      break;
    default:
      return false;
  }

  return raw ? parseFloat(output) : output;
}

const ProductImage = ({ data, rounded, className, ...rest }) => {
  const width = getWidth(rest);

  return (
    <img
      className={clsx(
        'max-w-full',
        className && className,
        {
          'w-full': width,
          'rounded': rounded,
        },
      )}
      src={data?.image ? data.image.sourceUrl : 'http://place-puppy.com/640x640'}
      alt={data?.image ? data.image.altText : 'no product image found'}
      {...rest}
    />
  );
};

const imagePropType = PropTypes.shape({
  sourceUrl: PropTypes.string,
  altText: PropTypes.string,
});

ProductImage.propTypes = {
  data: PropTypes.shape({
    image: imagePropType,
  }),
};

ProductImage.defaultProps = {
  data: {
    image: {
      sourceUrl: 'http://place-puppy.com/640x640',
      altText: 'product image',
    },
  },
};

export default ProductImage;
