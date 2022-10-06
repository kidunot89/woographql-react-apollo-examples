import List from './list';
import Info from './info';
import CheckoutButton from './checkout-button';
import { useSession } from '../session-provider';
import Spinner from '../spinner';

export function Cart() {
  const { fetchingCart } = useSession();

  if (fetchingCart) {
    return (<Spinner className="h-32 max-h-full w-full">Fetching the cart...</Spinner>)
  }

  return (
    <div className="flex flex-col items-center justify-center px-1 w-5/6 mx-auto">
      <List />
      <Info />
      <CheckoutButton />
    </div>
  );
}

export default Cart;
