import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import { mockCartItem } from '../../testing/mocks';
import Item from './item';
import ApolloMockProvider from '../../testing/apollo-mock-provider';

describe('Item on cart page', () => {
  afterAll(() => cleanup());
  const { baseElement } = render(
    <ApolloMockProvider>
      <Item item={mockCartItem} />
    </ApolloMockProvider>,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
