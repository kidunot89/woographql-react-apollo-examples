import { useState } from 'react';
import clsx from 'clsx';

import { useSession } from '../session-provider';
import Shipping from './shipping';
import { useOtherCartMutations } from '../../hooks/use-cart-mutations';

function Info() {
  const [couponCode, setCouponCode] = useState('');
  const { cart } = useSession();
  const {
    applyCoupon,
    applyingCoupon,
    removeCoupon,
  } = useOtherCartMutations();
  const subheaderClassName = 'px-5 py-2 w-full bg-lynch-50 font-serif font-bold text-lg mb-2 rounded-md mb-5';

  return (
    <div className="w-full grid grid-cols-4 grid-rows-4 md:gap-5 py-5">
      <div className="border-b-2 border-cornsilk-300 md:border-none mb-5 col-span-4 md:col-span-2 row-span-1 md:row-span-2">
        <div className={subheaderClassName}>
          Apply Coupon
        </div>
        <div className="w-full flex flex-col justify-center items-center px-5">
          <input
            placeholder="Enter a coupon code"
            className={clsx(
              'py-2 px-3 pr-8 block w-full mb-2',
              'appearance-none rounded border transition duration-500',
              'bg-gray-50 leading-tight',
              'focus:shadow focus:border-shark focus:outline-none'
            )}
            value={couponCode}
            onChange={(event) => setCouponCode(event?.target.value)}
          />
          <button
            type="button"
            className="secondary-button w-full mb-5"
            disabled={applyingCoupon}
            onClick={() => applyCoupon(couponCode)}
          >
            Apply
          </button>
        </div>
      </div>
      <div className="col-span-4 md:col-span-2 row-span-4 flex flex-col">
        <span className={subheaderClassName}>
          Order Details
        </span>
        <Shipping />
        <div className="w-full flex justify-between  px-5 py-1 font-sans">
          <span className="font-bold text-lg">Subtotal</span>
          <span className="font-bold text-lg">{cart?.subtotal}</span>
        </div>
        {cart?.appliedCoupons?.length && cart.appliedCoupons.map(
          (coupon) => {
            const remove = () => removeCoupon(coupon?.code);
            return (
              <div className="w-full flex justify-between px-5 py-1 font-sans">
                <div>
                  <span
                    className="text-lg text-red-600 mr-3"
                    role="button"
                    tabIndex={0}
                    onClick={remove}
                    onKeyPress={remove}
                  >
                    <i className="fa-solid fa-trash-can" />
                  </span>
                  <span className="font-bold text-lg">
                    Coupon &ldquo;
                    {coupon?.code}
                    &rdquo;
                  </span>
                </div>
                <span className="font-bold text-lg">
                  -
                  {coupon?.discountAmount}
                </span>
              </div>
            );
          },
        )}
        <div className="w-full flex justify-between px-5 py-1 font-sans">
          <span className="font-bold text-lg">Tax</span>
          <span className="font-bold text-lg">{cart?.totalTax}</span>
        </div>
        <div className="w-full flex justify-between px-5 py-1 font-sans">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-lg">{cart?.total}</span>
        </div>
      </div>
      <div className="col-span-4 md:col-span-2 row-span-2" />
    </div>
  );
}

export default Info;
