import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import { mockProducts } from '../testing/mocks';
import ApolloMockProvider from '../testing/apollo-mock-provider';
import SessionProvider from './session-provider';
import GroupedCartOptions from './grouped-cart-options';

describe('CartOptions for mocked product', () => {
  afterAll(() => cleanup());
  const { baseElement } = render(
    <ApolloMockProvider>
      <SessionProvider>
        <GroupedCartOptions products={mockProducts} />
      </SessionProvider>
    </ApolloMockProvider>,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
