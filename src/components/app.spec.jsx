import { render, waitFor } from '@testing-library/react';

import ApolloMockProvider from "../testing/ApolloMockProvider";
import App from './app';

describe('App component', () => {
  const { baseElement, queryByText } = render(
    <ApolloMockProvider>
      <App />
    </ApolloMockProvider>
  );

  it("renders successfully", async() => {
    await waitFor(() => expect(queryByText(/Fetching products/)).toBeTruthy());
    await waitFor(() => expect(queryByText(/Fetching products/)).toBeNull());
    expect(baseElement).toMatchSnapshot();
  });
});
