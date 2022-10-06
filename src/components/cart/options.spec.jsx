import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import { mockProduct } from '../../testing/mocks';
import Options from './options';
import ApolloMockProvider from '../../testing/apollo-mock-provider';

describe('Options', () => {
  afterAll(() => cleanup());
  const { baseElement } = render(
    <ApolloMockProvider>
      <Options product={mockProduct} />
    </ApolloMockProvider>,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
