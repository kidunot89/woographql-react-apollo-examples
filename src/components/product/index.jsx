import { useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

import Gallery from './gallery';
import CartOptions from './cart-options';
import GroupedCartOptions from './grouped-cart-options';
import SectionHeader from '../section-header';
import Spinner from '../spinner';

export const GET_PRODUCT = gql`
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

  fragment ProductContentFull on Product {
    id
    databaseId
    slug
    name
    type
    description
    shortDescription
    image {
      ...MediaContent
    }
    galleryImages {
      nodes {
        ...MediaContent
      }
    }
    productTags(first: 20) {
      nodes {
        id
        slug
        name
      }
    }
    attributes {
      nodes {
        id
        attributeId
        ... on LocalProductAttribute {
          name
          options
          variation
        }
        ... on GlobalProductAttribute {
          name
          options
          variation
        }
      }
    }
    ... on SimpleProduct {
      onSale
      stockStatus
      price
      rawPrice: price(format: RAW)
      regularPrice
      salePrice
      stockStatus
      stockQuantity
      soldIndividually
    }
    ... on VariableProduct {
      onSale
      stockStatus
      price
      rawPrice: price(format: RAW)
      regularPrice
      salePrice
      stockStatus
      stockQuantity
      soldIndividually
      attributes {
        nodes {
          id
          scope
          variation
          ... on LocalProductAttribute {
            name
            options
            label
          }
          ... on GlobalProductAttribute {
            name
            options
            label
            slug
            terms {
              nodes {
                id
                name
                slug
              }
            }
          }
        }
      }
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
            ...MediaContent
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
    ... on ExternalProduct {
      buttonText
      externalUrl
    }
    ... on GroupProduct {
      products(first: 20) {
        nodes {
          id
          databaseId
        }
      }
    }
  }

  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ...ProductContentFull
    }
  }
`;

const Product = () => {
  const { uri } = useParams();
  const { data, loading } = useQuery(
    GET_PRODUCT,
    {
      variables: {
        slug: uri
      },
      skip: !uri
    }
  );

  const product = data?.product;
  const galleryRef = useRef();

  const handleVariationChange = (variation) => {
    if (galleryRef.current) {
      const gallery = [...galleryRef.current.props.items];
      const nextIndex = gallery.findIndex(
        ({ original }) => original === variation.image?.sourceUrl,
      );
      
      galleryRef.current.slideToIndex(nextIndex);
    }
  };

  if (loading) {
    return <Spinner className="h-32 max-h-full w-full">Fetching product data...</Spinner>
  }

  return (
    <div className="grid grid-cols-12 auto-rows-auto">
      <SectionHeader className={clsx(
        'col-span-12 pt-4 px-12 pb-2',
        'text-2xl block',
        'md:hidden',
      )}>
        {product?.name}
      </SectionHeader>
      <div className={clsx(
        'col-span-12 pt-4 px-12 pb-2',
        'md:col-span-6',
      )}>
        <SectionHeader>Gallery</SectionHeader>
        <Gallery
          ref={galleryRef}
          main={product?.image || {}}
          images={(product?.galleryImages?.nodes || [])}
        />
      </div>
      <div className={clsx(
        'col-span-12 pt-4 px-12 pb-2',
        'md:col-span-6',
      )}>
        <SectionHeader className={clsx(
          'text-2xl hidden',
          'md:block',
        )}>
          {product?.name}
        </SectionHeader>
        <div dangerouslySetInnerHTML={{ __html: product?.shortDescription }} />
        {product && product.type === 'GROUPED' && (
          <GroupedCartOptions
            className="mt-5"
            products={product?.products?.nodes}
          />
        )}
        {product && product.type !== 'GROUPED' && (
          <CartOptions
            className="mt-5"
            product={product}
            onVariationChange={handleVariationChange}
          />
        )}
      </div>
      <div className="col-span-12 pt-4 px-12 pb-2">
        <SectionHeader>Description</SectionHeader>
        <div dangerouslySetInnerHTML={{ __html: product?.description }} />
      </div>
    </div>
  );
}

export default Product;