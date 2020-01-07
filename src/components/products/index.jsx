import React, { useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import InfiniteLoader from 'react-infinite-loader';
import { uniqBy } from 'lodash';

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

  const loadMore = () => {
    // eslint-disable-next-line
    console.log('fetching more items.');
    return hasMore() && fetchMore({
      variables: variables.last
        ? { before: data.products.pageInfo.endCursor }
        : { after: data.products.pageInfo.endCursor },
      updateQuery(prev, { fetchMoreResult }) {
        if (fetchMoreResult) {
          const next = {
            ...fetchMoreResult,
            products: {
              ...fetchMoreResult.products,
              edges: uniqBy([...prev.products.edges, ...fetchMoreResult.products.edges], 'cursor'),
            },
          };
          return next;
        }
        return prev;
      },
    });
  };

  const products = data.products.edges || [];

  return (
    <Grid ref={containerRef} maxWidth="100%" columns={columns} itemWidth={itemWidth} width={width}>
      {products.map(({ cursor, node, }) => {
        return (
          <ProductsItem key={cursor} data={node} width={itemWidth} />
        );
      })}
      <InfiniteLoader onVisited={loadMore} />
    </Grid>
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