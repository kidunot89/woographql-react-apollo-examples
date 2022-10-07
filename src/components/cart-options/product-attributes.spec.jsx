import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import { mockProduct } from '../../testing/mocks';
import ProductAttributes from './product-attributes';

describe('Product variation attributes', () => {
  afterAll(() => cleanup());
  let variation = mockProduct.variations.nodes[0];
  const setVariation = jest.fn((v) => variation = v);

  const { baseElement } = render(
    <ProductAttributes
      variations={mockProduct.variations.nodes}
      attributes={mockProduct.attributes}
      setVariation={setVariation}
    />,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});