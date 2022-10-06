import { render } from '@testing-library/react';

import ApolloMockProvider from '../../testing/apollo-mock-provider';
import Product from '.';

describe('Product component', () => {
  const { baseElement } = render(
    <ApolloMockProvider>
      <Product />
    </ApolloMockProvider>
  );

  it('renders successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
