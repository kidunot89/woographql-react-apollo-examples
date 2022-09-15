import { render, waitFor } from "@testing-library/react";

import ApolloMockProvider from "../../testing/ApolloMockProvider";
import ProductsList from ".";

describe("ProductsList component", () => {
  const { baseElement, queryByText } = render(
    <ApolloMockProvider>
      <ProductsList />
    </ApolloMockProvider>
  );

  it("renders successfully", async() => {
    await waitFor(() => expect(queryByText(/Fetching products/)).toBeTruthy());
    await waitFor(() => expect(queryByText(/Fetching products/)).toBeNull());
    expect(baseElement).toMatchSnapshot();

  });
});
