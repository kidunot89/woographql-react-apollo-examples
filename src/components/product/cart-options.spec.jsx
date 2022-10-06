import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import { mockProduct } from '../../testing/mocks';
import ApolloMockProvider from '../../testing/apollo-mock-provider';
import SessionProvider from '../session-provider';
import CartOptions from './cart-options';

describe('CartOptions for mocked product', () => {
  afterAll(() => cleanup());
  const { baseElement } = render(
    <ApolloMockProvider>
      <SessionProvider>
        <CartOptions product={mockProduct} />
      </SessionProvider>
    </ApolloMockProvider>,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
