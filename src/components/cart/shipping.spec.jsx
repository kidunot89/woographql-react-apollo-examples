import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import Shipping from './shipping';
import ApolloMockProvider from '../../testing/apollo-mock-provider';
import SessionProvider from '../session-provider';

describe('Shipping', () => {
  afterAll(() => cleanup());
  const { baseElement } = render(
    <ApolloMockProvider>
      <SessionProvider>
        <Shipping />
      </SessionProvider>
    </ApolloMockProvider>,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
