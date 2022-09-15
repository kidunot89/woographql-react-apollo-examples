import React from 'react';
import { render } from '@testing-library/react';
import { toMatchDiffSnapshot } from 'snapshot-diff';

import Price from './price';

expect.extend({ toMatchDiffSnapshot });
describe('Price component', () => {
  it('renders simple product pricing successfully', () => {
    const { baseElement } = render(
      <Price
        regularPrice="$20.00"
        price="$20.00"
        type="SIMPLE"
      />
    );
    expect(baseElement).toMatchSnapshot();

    expect(
      <Price
        regularPrice="$20.00"
        price="$20.00"
        type="SIMPLE"
      />
    ).toMatchDiffSnapshot(
      <Price
        onSale
        regularPrice="$20.00"
        price="$18.99"
        type="SIMPLE"
      />
    );
  });

  it('renders variable product pricing successfully', () => {
    const { baseElement } = render(
      <Price
        regularPrice="$15.00-$20.00"
        price="$15.00-$20.00"
        type="VARIABLE"
      />
    );
    expect(baseElement).toMatchSnapshot();

    expect(
      <Price
        regularPrice="$15.00-$20.00"
        price="$15.00-$20.00"
        type="VARIABLE"
      />
    ).toMatchDiffSnapshot(
      <Price
        onSale
        regularPrice="$15.00-$20.00"
        price="$14.99-$18.99"
        type="VARIABLE"
      />
    );
  });
});
