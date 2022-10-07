import { useSession } from '../session-provider';
import Spinner from '../spinner';

function CheckoutButton() {
  const { pathToCheckout, fetchingCart } = useSession();
  if (fetchingCart || !pathToCheckout) {
    return <Spinner className="w-full py-3" />;
  }

  return (
    <a
      className="primary-button mx-6 py-3 w-full text-center text-xl mb-5"
      href={pathToCheckout}
    >
      <i className="fa-solid fa-cash-register mr-5" />
      Checkout
    </a>
  );
}

export default CheckoutButton;
