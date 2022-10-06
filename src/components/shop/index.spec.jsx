import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ApolloMockProvider from "../../testing/apollo-mock-provider";
import ProductsList from ".";

describe("ProductsList component", () => {
  const { baseElement, queryByText } = render(
    <ApolloMockProvider>
      <MemoryRouter>
        <ProductsList first={5} />
      </MemoryRouter>
    </ApolloMockProvider>
  );

  it("renders successfully", async() => {
    await waitFor(() => expect(queryByText(/Fetching products/)).toBeTruthy());
    await waitFor(() => expect(queryByText(/Fetching products/)).toBeNull());
    expect(baseElement).toMatchSnapshot();

  });
});
