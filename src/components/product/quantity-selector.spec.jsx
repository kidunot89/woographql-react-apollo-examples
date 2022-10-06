import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import QuantitySelector from './quantity-selector';

describe('Quantity input control', () => {
  afterAll(() => cleanup());
  let quantity = 0;
  const onIncrement = jest.fn(() => quantity = quantity + 1);
  const onDecrement = jest.fn(() => quantity = quantity - 1);

  const { baseElement } = render(
    <QuantitySelector
      value={quantity}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
    />,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});