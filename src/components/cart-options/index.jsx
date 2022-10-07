import { useEffect, useState } from 'react';
import clsx from 'clsx';

import useCartMutations from '../../hooks/use-cart-mutations';
import Spinner from '../spinner';
import QuantitySelector from './quantity-selector';
import ProductAttributes from './product-attributes';
import Price from './price';

const CartOptions = ({ className, product, onVariationChange }) => {
  const { type, soldIndividually, attributes } = product;
  const showQuantityControl = !soldIndividually
    && (product.type === 'SIMPLE' || product.type === 'VARIABLE');
  const variations = (product).variations?.nodes || [];
  const [variation, setVariation] = useState();

  const { quantityFound, mutate, executing } = useCartMutations(
    product.databaseId,
    variation?.databaseId,
  );
  const [mutation, setMutation] = useState(quantityFound ? 'update' : 'add',);
  const [quantity, setQuantity] = useState(quantityFound || 1);
  
  useEffect(() => {
    setMutation(quantityFound ? 'update' : 'add');
    setQuantity(quantityFound || 1);
  }, [quantityFound]);

  useEffect(() => {
    if (variation) {
      onVariationChange && onVariationChange(variation);
    }
  }, [variation, onVariationChange]);

  const selectedProduct = variation || product;
  const outOfStock = selectedProduct.stockStatus === 'OUT_OF_STOCK';
  const quantityChanged = !!quantityFound ? quantity !== quantityFound : true;
  const total = parseFloat((selectedProduct.price).split('$')[1]) * quantity;

  let submitButtonText = mutation === 'update' ? 'Update' : 'Add To Cart';
  if (outOfStock) {
    submitButtonText = 'Out of Stock';
  }
  if (product.buttonText) {
    submitButtonText = product.buttonText;
  }
  
  const maxQuantity = selectedProduct.stockStatus === 'IN_STOCK' && !!selectedProduct.stockQuantity
    ? selectedProduct.stockQuantity
    : undefined

  const onSubmit = (e) => {
    e.preventDefault();
    if (product.type === 'EXTERNAL') {
      window.location.href = product.externalUrl;
    } else {
      mutate({ mutation, quantity });
    }
  };

  return (
    <form
      className={className}
      onSubmit={onSubmit}
    >
      {type === 'VARIABLE' && (
        <ProductAttributes
          variations={variations}
          attributes={attributes}
          setVariation={setVariation}
        />
      )}
      <div className={clsx(
        'flex flex-wrap items-center p-0 w-full mt-5 gap-y-3',
        'lg:flex-nowrap lg:gap-x-3',
      )}>
        {!!selectedProduct?.price && (<Price className="w-1/4" amount={total} />)}
        {showQuantityControl && (
          <QuantitySelector
            className={clsx(
              'w-3/4 justify-end',
              'lg:w-1/3 lg:justify-start'
            )}
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={maxQuantity}
          />
        )}
        <button
          className={clsx(
            'primary-button w-full',
            'disabled:opacity-25 disabled:cursor-not-allowed disabled:text-white',
            'lg:1/3',
            {
              'w-2/4 mr-auto': quantityFound,
              'lg:1/6': quantityFound,
            },
          )}
          type="submit"
          disabled={outOfStock || !quantityChanged}
        >
          {!!executing ? <Spinner className="h-6 max-h-full" /> : submitButtonText}
        </button>
        {!!quantityFound && (
          <button
            className={clsx(
              'icon-button primary-button w-1/4',
              'h-11 px-1',
              'bg-red-600 text-white',
              'hover:bg-red-400 hover:text-white',
              'lg:w-1/6',
            )}
            type="submit"
            onClick={() => quantityFound && setMutation('remove')}
          >
            <i className="fa-solid fa-trash-can" />
          </button>
        )}
      </div>
    </form>
  );
}

export default CartOptions;
