import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const Image = styled.img`
  max-width: 100%;
  width: ${(props) => getWidth(props) ? getWidth(props) : '100%'};
  ${({ rounded }) => rounded && `border-radius: 50%;`}
`;

const ProductImage = ({ data, ...rest }) => {
  const { image } = data;

  return image 
    ? <Image src={data.image.sourceUrl} alt={data.image.altText} {...rest} />
    : <Image src="http://place-puppy.com/640x640" alt="no product image found" {...rest} />;
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