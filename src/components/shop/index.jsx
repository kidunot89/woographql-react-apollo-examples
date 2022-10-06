// products/index.jsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import clsx from 'clsx';

import Spinner from '../spinner';
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

const Shop = (props) => {
  const {
    columns,
    itemWidth,
    width,
    ...variables
  } = props;
  const { data, loading, error, fetchMore } = useQuery(
    GET_PRODUCTS,
    {
      variables,
      notifyOnNetworkStatusChange: true,
    },
  );
  
  if (loading && !data) {
    return <Spinner className="h-32 max-h-full w-full">Fetching products...</Spinner>;
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
      <div
        className={clsx(
          'container mx-auto relative py-3 px-4 max-w-full',
          'grid grid-cols-1 gap-y-8',
          'md:grid-cols-3',
          'lg:max-w-4xl lg:grid-cols-4 lg:gap-4',
        )}
      >
        {products.map(({ node }) => {
          return (
            <ProductsItem className="mx-auto border border-shark rounded" key={node.id} data={node} width={itemWidth} />
          );
        })}
      </div>
      {hasMore() && (
        <button
          className="cta-button fixed mb-4 bottom-0 left-1/2 -translate-x-1/2 w-1/2"
          onClick={loadMore}
        >
          {loading ? <Spinner className="h-6 max-h-full" /> : 'Load More'}
        </button>
      )}
    </>
  );
};

export default Shop;