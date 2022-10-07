import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import Price from './price';

describe('Product price', () => {
  afterAll(() => cleanup());

  const { baseElement } = render(
    <Price amount={150} />,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});