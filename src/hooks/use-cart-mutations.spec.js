import { renderHook, waitFor } from '@testing-library/react'
import SessionProvider from '../components/session-provider';
import useCartMutations from './use-cart-mutations';
import ApolloMockProvider from '../testing/apollo-mock-provider';

test('should execute cart mutations', async () => {
  const wrapper = ({ children }) => (
    <ApolloMockProvider>
      <SessionProvider>{children}</SessionProvider>
    </ApolloMockProvider>
  );
  const { result } = renderHook(
    () => useCartMutations(250),
    { wrapper }
  );

  await waitFor(() => expect(result.current.quantityFound).toBe(4));
})