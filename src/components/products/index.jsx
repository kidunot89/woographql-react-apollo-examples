// products/index.jsx
import React, { useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';

import Grid from '../grid';
import ProductsItem from './item';

export const GET_PRODUCTS = gql`
  query ($first: Int, $after: String) {
    products(first: $first, after: $after, where: { supportedTypesOnly: true }) {
      edges {
        cursor
        node {
          id
          slug
          ... on ContentNode {
            uri
          }
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const ProductsList = (props) => {
  const containerRef = useRef(null);
  const {
    columns,
    itemWidth,
    width,
    ...variables
  } = props;
  const { data, loading, error, fetchMore } = useQuery(GET_PRODUCTS, { variables });
  
  if (loading) {
    return <div>Fetching products...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const hasMore = () => {
    if (variables.last) {
      return data.products.pageInfo.hasPreviousPage;
    }
    return data.products.pageInfo.hasNextPage;
  };

  const loadMore = () => fetchMore({
      variables: variables.last
        ? { before: data.products.pageInfo.endCursor }
        : { after: data.products.pageInfo.endCursor }
    });

  const products = data.products.edges || [];

  return (
    <>
      <Grid maxWidth="100%" columns={columns} itemWidth={itemWidth} {...rest}>
        {products.map(({ node }) => {
          return (
            <ProductsItem key={node.id} data={node} width={itemWidth} />
          );
        })}
      </Grid>
      {hasMore() && (
        <button
          onClick={loadMore}
          style={{
            position: 'fixed',
            marginBottom: '1rem',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%',
            width: '50%'
          }}
        >
          Load More
        </button>
      )}
    </>
  );
};

ProductsList.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  itemWidth: PropTypes.string,
  width: PropTypes.string
};

ProductsList.defaultProps = {
  columns: 'auto-fit',
  itemWidth: '375px',
  width: undefined,
};

export default ProductsList;