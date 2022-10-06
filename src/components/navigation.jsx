import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { useSession } from './session-provider';
import Logo from './logo';

function Navigation() {
  const { cart } = useSession();

  return (
    <nav className={clsx(
      'navbar',
      'top-0 z-40 sticky',
      'bg-gray-300 text-shark',
    )}>
      <div
        className={clsx(
          'max-w-screen-sm mx-auto px-2',
          'sm:px-6',
          'md:max-w-screen-md',
          'lg:max-w-screen-lg lg:px-8',
          'xl:max-w-screen-xl'
        )}
      >
        <div
          className={clsx(
            'relative h-24 min-h-full',
            'flex items-center justify-between gap-x-10',
            'lg:flex-nowrap',
          )}
        >
          <Logo className="justify-self-start" />
          <Link
            className={clsx(
              'px-6 py-2.5 mx-auto',
              'rounded transition-colors',
              'font-sans font-bold text-lg',
              'hover:text-white hover:bg-shark',
              { '': undefined },
            )}
            to="/"
          >
            Shop
          </Link>
          <Link
            className={clsx(
              'px-2 py-2.5',
              'rounded transition-colors',
              'icon-button text-lg',
              'hover:text-white hover:bg-shark',
              { '': undefined },
            )}
            to="/cart"
          >
            <i className="fa-solid fa-basket-shopping" />
            <span className="font-sans text-base font-bold ml-2">{cart?.contents?.itemCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
