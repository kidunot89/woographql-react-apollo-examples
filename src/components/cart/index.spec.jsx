import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import ApolloMockProvider from '../../testing/apollo-mock-provider';
import SessionProvider from '../session-provider';
import Cart from '.';

describe('Cart', () => {
  afterAll(() => cleanup());
  const { baseElement } = render(
    <ApolloMockProvider>
      <SessionProvider>
        <Cart />
      </SessionProvider>
    </ApolloMockProvider>,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
