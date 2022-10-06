import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';

import useCartMutations from '../../hooks/use-cart-mutations';
import QuantitySelector from '../product/quantity-selector';

function Options({ product, onVariationChange, sticky }) {
  const formClassName = useMemo(
    () => `w-full
    flex
    flex-wrap 
    gap-y-5 
    items-center 
    justify-between
    order-5
    md:justify-start
    md:mt-auto
    ${sticky && 'sticky bottom-0 p-5 bg-champagne-300 border-t-2 border-cornsilk-300'}
    `,
    [sticky],
  );

  const { type, soldIndividually, attributes } = product;
  const variations = product.variations?.nodes || [];

  const [selectedAttributes, selectAttributes] = useState(
    (attributes?.nodes || []).reduce(
      (results, attribute) => {
        const { name, options, terms } = attribute;
        return {
          ...results,
          [name]: !terms
            ? (options)[0]
            : (terms?.nodes)[0].name,
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

  const { quantityFound, mutate } = useCartMutations(
    product.databaseId,
    selectedVariation?.databaseId,
  );
  const [mutation, setMutation] = useState(
    quantityFound ? 'update' : 'add',
  );
  const [quantity, setQuantity] = useState(quantityFound || 1);
  useEffect(() => {
    setMutation(quantityFound ? 'update' : 'add');
    setQuantity(quantityFound || 1);
  }, [quantityFound]);

  const selectedProduct = selectedVariation || product;
  const outOfStock = selectedProduct.stockStatus === 'OUTOFSTOCK';

  let submitButtonText = mutation === 'update' ? 'Update' : 'Add To Basket';
  if (outOfStock) {
    submitButtonText = 'Out of Stock';
  }

  const incrementQuantity = () => {
    if (selectedProduct.stockStatus === 'INSTOCK'
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
  }, [selectedVariation]);

  useEffect(() => {
    setMutation(quantityFound ? 'update' : 'add');
    setQuantity(quantityFound || 1);
  }, [quantityFound, selectedProduct]);

  const onSubmit = (e) => {
    e.preventDefault();
    mutate({ mutation, quantity });
  };

  return (
    <form
      onSubmit={onSubmit}
      className={formClassName}
    >
      {type === 'VARIABLE' && (
        <div className="w-full">
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
              <div key={id} className="flex flex-wrap justify-start gap-x-5 mb-5">
                <div className="text-lg font-bold italic w-full flex-none">{label}</div>
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
                    <div className="radio-button-wrapper shrink">
                      <label className="radio-button-label">
                        <input
                          type="radio"
                          name={name}
                          value={value}
                          className="hidden"
                          checked={selectedAttributes[name] === value}
                          onChange={() => {
                            selectAttributes({
                              ...selectedAttributes,
                              [name]: value,
                            });
                          }}
                        />
                        <span className="radio-button" />
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
      <span className="
      inline-block
      font-sans
      font-semibold
      text-xl
      text-center
      w-2/12"
      >
        $
        {parseFloat((selectedProduct.price).split('$')[1]) * quantity}
      </span>
      {!soldIndividually && (
        <QuantitySelector
          className="w-9/12 ml-auto"
          value={quantity}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
        />
      )}
      <button
        type="submit"
        className={`primary-button
        disabled:bg-gray-500
        ${quantityFound ? 'w-9/12' : 'w-full'}
        `.trim()}
        disabled={outOfStock}
      >
        {submitButtonText}
      </button>
      {!!quantityFound && (
        <button
          type="submit"
          className="icon-button
          primary-button
          h-11
          bg-red-600
          text-white
          hover:bg-red-400
          w-2/12
          ml-auto"
          onClick={() => quantityFound && setMutation('remove')}
        >
          <i className="fa-solid fa-trash-can" />
        </button>
      )}
    </form>
  );
}

export default Options;
