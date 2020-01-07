import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';

import Grid from '../grid';
import ProductsItem from './item';

export const GET_PRODUCTS = gql`
  query {
    products(where: { supportedTypesOnly: true }) {
      edges {
        cursor
        node {
          id
          slug
          name
          type
          shortDescription
          image {
            id
            sourceUrl
            altText
          }
          galleryImages {
            nodes {
              id
              sourceUrl
              altText
            }
          }
          ... on SimpleProduct {
            onSale
            price
            regularPrice
          }
          ... on VariableProduct {
            onSale
            price
            regularPrice
          }
        }
      }
    }
  }
`;

const ProductsList = (props) => {
  const {
    columns,
    itemWidth,
    ...rest
  } = props;
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  
  if (loading) {
    return <div>Fetching products...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const products = data.products.edges || [];

  return (
    <Grid maxWidth="100%" columns={columns} itemWidth={itemWidth} {...rest}>
      {products.map(({ cursor, node, }) => {
        return (
          <ProductsItem key={cursor} data={node} width={itemWidth} />
        );
      })}
    </Grid>
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  itemWidth: PropTypes.string,
};

ProductsList.defaultProps = {
  products: [],
  columns: 'auto-fit',
  itemWidth: '375px',
};

export default ProductsList;