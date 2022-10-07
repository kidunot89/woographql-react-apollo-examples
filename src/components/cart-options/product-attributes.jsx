import { useState, useEffect } from 'react';

function ProductAttributes({ variations, attributes, setVariation }) {
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

  useEffect(() => {
    const variation = variations && variations.find(
      ({ attributes: variationAttributes }) => (
        variationAttributes?.nodes || []
      )?.every(
        ({ value, label }) => {
          console.log({ value, label }, selectedAttributes)
          return selectedAttributes[label] === value;
        },
      ),
    );

    if (variation) {
      setVariation(variation);
    }
  }, [selectedAttributes, setVariation, variations]);

  

  return (
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
  );
}

export default ProductAttributes;
