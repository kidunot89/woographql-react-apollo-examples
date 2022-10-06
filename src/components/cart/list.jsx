import clsx from 'clsx';

import { useSession } from '../session-provider';
import Item from './item';

function List() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  console.log(navigator.userAgent);
  const { cart } = useSession();
  const items = cart?.contents?.nodes || [];
  const subheaderClassName = 'px-5 py-2 w-full bg-lynch-50 font-serif font-bold text-lg mb-2'

  return (
    <div className="w-full mt-5 pb-5 md:pb-3 border-b-2 border-cornsilk-300 grid grid-cols-3 md:grid-cols-6 gap-y-3 md:gap-y-6 gap-x-0">
      <div className={clsx(
        subheaderClassName,
        'flex items-center col-span-1 rounded-l',
        'md:col-span-3',
      )}>
        Product
      </div>
      <div className={clsx(
        subheaderClassName,
        'flex items-center justify-start col-span-1',
        'md:px-0',
      )}>
        {isMobile ? 'QTY' : 'Quantity'}
      </div>
      <div className={clsx(
        subheaderClassName,
        'hidden items-center col-span-1',
        'md:flex',
      )}>
        Unit Price
      </div>
      <div className={clsx(
        subheaderClassName,
        'flex items-center col-span-1 rounded-r',
      )}>
        Total
      </div>
      {items.map((item) => <Item key={item.key} item={item} />)}
    </div>
  );
}

export default List;
