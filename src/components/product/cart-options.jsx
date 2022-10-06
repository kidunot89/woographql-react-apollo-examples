import { useEffect, useState } from 'react';
import clsx from 'clsx';

import useCartMutations from '../../hooks/use-cart-mutations';
import QuantitySelector from './quantity-selector';
import Spinner from '../spinner';

const CartOptions = ({ className, product, onVariationChange }) => {
  const { type, soldIndividually, attributes } = product;
  const showQuantityControl = !soldIndividually
    && (product.type === 'SIMPLE' || product.type === 'VARIABLE');
  const variations = (product).variations?.nodes || [];

  const [selectedAttributes, selectAttributes] = useState(
    (attributes?.nodes || []).reduce(
      (results, attribute) => {
        const { name, options, terms } = attribute;
        return {
          ...results,
          [name]: !terms
            ? options[0]
            : terms?.nodes[0].name,
        };
      },
      {},
    ),
  );

  const selectedVariation = variations && variations.find(
    ({ attributes: variationAttributes }) => (
      variationAttributes?.nodes || []
    )?.every(
      ({ value, label }) => selectedAttributes[label] === value,
    ),
  );

  const { quantityFound, mutate, executing } = useCartMutations(
    product.databaseId,
    selectedVariation?.databaseId,
  );
  const [mutation, setMutation] = useState(quantityFound ? 'update' : 'add',);
  const [quantity, setQuantity] = useState(quantityFound || 1);
  
  useEffect(() => {
    setMutation(quantityFound ? 'update' : 'add');
    setQuantity(quantityFound || 1);
  }, [quantityFound]);

  const selectedProduct = selectedVariation || product;
  const outOfStock = selectedProduct.stockStatus === 'OUT_OF_STOCK';
  const quantityChanged = !!quantityFound ? quantity !== quantityFound : true;

  let submitButtonText = mutation === 'update' ? 'Update' : 'Add To Cart';
  if (outOfStock) {
    submitButtonText = 'Out of Stock';
  }
  if (product.buttonText) {
    submitButtonText = product.buttonText;
  }

  const incrementQuantity = () => {
    if (selectedProduct.stockStatus === 'IN_STOCK'
      && !!selectedProduct.stockQuantity
      && selectedProduct.stockQuantity === quantity) {
      return;
    }

    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity === 1) {
      return;
    }

    setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (selectedVariation) {
      onVariationChange && onVariationChange(selectedVariation);
    }
  }, [selectedVariation, onVariationChange]);

  useEffect(() => {
    setMutation(quantityFound ? 'update' : 'add');
    setQuantity(quantityFound || 1);
  }, [quantityFound, selectedProduct]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (product.type === 'EXTERNAL') {
      window.location.href = product.externalUrl;
    } else {
      mutate({ mutation, quantity });
    }
  };

  return (
    <form className={className}
      onSubmit={onSubmit}
    >
      {type === 'VARIABLE' && (
        <div>
          {(attributes?.nodes || []).map((attribute) => {
            const {
              id,
              name,
              label,
              options,
              variation: isVariationAttribute,
              terms,
            } = attribute;

            if (!isVariationAttribute) {
              return null;
            }

            return (
              <div key={id}>
                <div className="font-bold">{label}</div>
                {(terms?.nodes || options)?.map((option) => {
                  let value;
                  let buttonLabel;

                  if (typeof option !== 'object') {
                    value = option;
                    buttonLabel = option
                      .replace('-', ' ')
                      .replace(/^\w/, (c) => c.toUpperCase());
                  } else {
                    const { name: termName } = option;
                    value = termName;
                    buttonLabel = termName;
                  }
                  return (
                    <div key={value}>
                      <label>
                        <input
                          className="mr-3 text-center"
                          type="radio"
                          name={name}
                          value={value}
                          checked={selectedAttributes[name] === value}
                          onChange={() => {
                            selectAttributes({
                              ...selectedAttributes,
                              [name]: value,
                            });
                          }}
                        />
                        {buttonLabel}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
      <div className={clsx(
        'flex flex-wrap items-center p-0 w-full mt-5 gap-y-3',
        'lg:flex-nowrap lg:gap-x-3',
      )}>
        {!!selectedProduct?.price && (
          <span className={clsx(
            'w-1/4',
            'lg:'
          )}>
            $
            {parseFloat((selectedProduct.price).split('$')[1]) * quantity}
          </span>
        )}
        {showQuantityControl && (
          <QuantitySelector
            className={clsx(
              'w-3/4 justify-end',
              'lg:w-1/3 lg:justify-start'
            )}
            value={quantity}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
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
