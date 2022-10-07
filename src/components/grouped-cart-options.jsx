import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import Spinner from './spinner';
import CartOptions from './cart-options';

const GET_PRODUCT_CART_INFO_SLICE = gql`
  query GetProductInfoSlice ($id: ID!) {
    product(id: $id) {
      id
      databaseId
      type
      slug
      name
      image {
        id
        sourceUrl
        thumbnailUrl: sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
        altText
        sizes
      }
      ...on SimpleProduct {
        stockStatus
        stockQuantity
        soldIndividually
        onSale
        price
        regularPrice
        salePrice
      }
      ...on VariableProduct {
        stockStatus
        stockQuantity
        soldIndividually
        onSale
        price
        regularPrice
        salePrice
        variations(first: 50) {
          nodes {
            id
            databaseId
            name
            price
            rawPrice: price(format: RAW)
            regularPrice
            salePrice
            onSale
            stockStatus
            stockQuantity
            image {
              id
              sourceUrl
              thumbnailUrl: sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
              altText
              sizes
            }
            attributes {
              nodes {
                id
                name
                label
                value
              }
            }
          }
        }
      }
    }
  }
`;

function SingleProductCartOptions({ id }) {
  const { data, loading } = useQuery(
    GET_PRODUCT_CART_INFO_SLICE,
    { variables: { id } }
  );

  if (loading) {
    return (<Spinner className="h-24 mt-10 max-h-full rounded bg-lynch-50 bg-opacity-25" />)
  }

  const product = data?.product;

  return (
    <div className="w-full inline-flex flex-wrap items-center justify-start">
      <Link to={`/product/${product.slug}`} className="w-full font-bold text-lynch">{product.name}</Link>
      <div className="w-1/3 relative max-h-full h-24 mt-5 mr-5 flex-1">
        <img
          className="w-full h-full object-contain object-left"
          src={product.image?.thumbnailUrl}
          alt={product.image?.altText}
          sizes={product.image?.sizes}
        />
      </div>
      <CartOptions
        className="w-2/3 ml-auto shrink"
        product={product}
      />
    </div>
  )
}

function GroupedCartOptions({ className, products }) {
  return (
    <div className={className}>
      {products.map(({ id }) => (
        <SingleProductCartOptions key={id} id={id} />
      ))}
    </div>
  )
}

export default GroupedCartOptions;
