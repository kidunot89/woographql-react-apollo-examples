import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';

import useCartMutations from '../../hooks/use-cart-mutations';
import { GET_PRODUCT } from '../product';
import Spinner from '../spinner';

const GET_PRODUCT_VARIATION = gql`
  fragment MediaContent on MediaItem {
    id
    sourceUrl
    thumbnailUrl: sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
    altText
    sizes
    thumbnailSizes: sizes(size: WOOCOMMERCE_THUMBNAIL)
    srcSet
    thumbnailSrcSet: srcSet(size: WOOCOMMERCE_THUMBNAIL)
    mediaDetails {
      width
      height
    }
  }

  fragment VariationContent on ProductVariation {
    id
    name
    slug
    price
    regularPrice
    salePrice
    stockStatus
    stockQuantity
    onSale
    image {
      ...MediaContent
    }
  }

  query GetProductVariation($id: ID!) {
    productVariation(id: $id, idType: DATABASE_ID) {
      ...VariationContent
    }
  }
`;

function Item({ item }) {
  const slug = item.product?.node?.slug;
  const productId = item.product?.node?.databaseId;
  const variationId = item.variation?.node?.databaseId || undefined;

  const {
    quantityFound,
    removeCartItem,
    updateQuantity,
  } = useCartMutations(productId, variationId);
  const [quantity, setQuantity] = useState(quantityFound);
  const { data: productData, loading: fetchingProduct } = useQuery(
    GET_PRODUCT,
    {
      variables: { slug },
      skip: !slug,
    },
  );

  const { data: variationData, loading: fetchingVariation } = useQuery(
    GET_PRODUCT_VARIATION,
    {
      variables: { id: `${variationId}` },
      skip: !variationId,
    }
  );

  if (fetchingProduct || fetchingVariation || (!productData && !variationData)) {
    return <Spinner />;
  }

  let product;
  if (variationData) {
    product = variationData.productVariation;
  } else {
    product = productData?.product;
  }

  const quantityChanged = quantityFound !== quantity
  const maxQuantity = 'IN_STOCK' === product.stockStatus
    && product.stockQuantity
    ? product.stockQuantity
    : undefined;
  const soldIndividually = product.soldIndividually;

  return (
    <>
      <div className="col-span-1 hidden md:block">
        <div className="h-32 max-h-full relative">
          <img
            className="object-contain w-full h-full object-left"
            src={product?.image?.sourceUrl}
            alt={product?.image?.altText}
            align="left"
          />
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 flex flex-col items-start justify-center pr-2 lg:px-5">
        <div className="font-sans">{product?.name}</div>
        <button
          className="font-sans text-xs w-auto "
          type="button"
          onClick={removeCartItem}
        >
          (Remove item)
        </button>
      </div>
      <div className="col-span-1 flex flex-col justify-center px-2 lg:pr-6">
        <label htmlFor="quantity" className="mb-2 text-sm font-medium sr-only">{`Number of ${item.product?.node?.name} in basket`}</label>
        <div className="relative">
          <input
            type="number"
            id="quantity"
            className={clsx(
              'block p-4 pl-2 w-full',
              'appearance-none rounded border transition duration-500',
              'bg-gray-50 leading-tight',
              'focus:shadow focus:border-shark focus:outline-none',
              'lg:pl-6',
              { 'quantity-input': soldIndividually }
            )}
            value={quantity}
            onChange={(event) => setQuantity(parseInt(event.target.value, 10))}
            min={1}
            max={maxQuantity}
          />
          <button
            type="submit"
            className={clsx(
              'icon-button secondary-button',
              'text-persian-green leading-3',
              'absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-none px-2',
              'focus:outline-none focus:border-persian-green-700',
              'hover:border-persian-green-700',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              { 'hidden': soldIndividually }
            )}
            disabled={!quantityChanged}
            onClick={() => updateQuantity(quantity)}
          >
            <i className="fa-solid fa-cart-arrow-down align-top" />
          </button>
        </div>
      </div>


      <div className={clsx(
        'col-span-1',
        'hidden items-center justify-start pl-5',
        'font-bold text-center font-sans',
        'md:flex',
      )}>
        {product.price}
      </div>
      <div className={clsx(
        'col-span-1',
        'flex items-center justify-start pl-5',
        'font-bold text-center font-sans',
        'md:justify-start',
      )}>
        {item.total}
      </div>
    </>
  );
}

export default Item;
