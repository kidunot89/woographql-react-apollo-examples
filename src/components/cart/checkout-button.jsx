import { useSession } from '../session-provider';

function CheckoutButton() {
  const { pathToCheckout } = useSession();
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
