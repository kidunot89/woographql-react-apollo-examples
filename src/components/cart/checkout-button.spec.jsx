import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup, waitFor } from '@testing-library/react';

import ApolloMockProvider from '../../testing/apollo-mock-provider';
import SessionProvider from '../session-provider';
import CheckoutButton from './checkout-button';

describe('CheckoutButton', () => {
  afterAll(() => cleanup());
  const { baseElement, getByText } = render(
    <ApolloMockProvider>
      <SessionProvider>
        <CheckoutButton />
      </SessionProvider>
    </ApolloMockProvider>,
  );

  it('should render successfully', async () => {
    await waitFor(() => expect(getByText(/Checkout/)).toBeTruthy());
    expect(baseElement).toMatchSnapshot();
  });
});
