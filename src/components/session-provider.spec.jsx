import { renderHook, waitFor } from '@testing-library/react'
import SessionProvider, { useSession } from '../components/session-provider';
import ApolloMockProvider from '../testing/apollo-mock-provider';

test('should provider session data and dispatches', async () => {
  const wrapper = ({ children }) => (
    <ApolloMockProvider>
      <SessionProvider>{children}</SessionProvider>
    </ApolloMockProvider>
  );
  const { result } = renderHook(
    () => useSession(),
    { wrapper }
  );

  await waitFor(() => expect(result.current.cart).toBeTruthy());
  expect(result.current.customer).toBeTruthy();
  expect(result.current.pathToCheckout).toBeTruthy();
})