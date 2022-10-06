import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import clsx from 'clsx';

import { useSession } from '../session-provider';
import Spinner from '../spinner';
import { useOtherCartMutations } from '../../hooks/use-cart-mutations';

const GET_COUNTRY_CODES = gql`
{
  __type(name: "CountriesEnum") {
    name
    enumValues {
      name
    }
  }
}
`;

const initialFormState = {
  city: '',
  state: 'AL',
  zip: '',
  country: 'US',
}

export function ShippingLocaleForm(props) {
  const [input, setInput] = useState(initialFormState);
  const [countriesAndStates, setCountriesAndStates] = useState([]);
  const { onSubmit, disabled, message } = props;
  const fieldClassName = 'w-full flex justify-between items-center py-1 font-sans';
  const inputClassName = clsx(
    'py-2 px-3 w-4/5 ml-auto',
    'text-shark leading-tight',
    'focus:outline-none focus:shadow focus:border-shark',
    'appearance-none border rounded transition duration-500',
  );

  const inputValid = !!input.city && !!input.zip;
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(input);
  };

  const { data, loading: fetchingCountries } = useQuery(GET_COUNTRY_CODES);
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then(({ data }) => setCountriesAndStates(data));
  }, [])

  if (fetchingCountries || !countriesAndStates.length) {
    return <Spinner />;
  }

  const supportedCountries = data?.__type?.enumValues?.map(({ name }) => name) || [];
  const countryOptions = countriesAndStates
    .filter(({ iso2 }) => supportedCountries.includes(iso2))
    .map(({ name, iso2 }) => ({ name, value: iso2 }));
  
  const stateOptions = countriesAndStates
    .find(({ iso2 }) => iso2 === input.country)?.states
    .map(({ name, state_code }) => ({ name, value: state_code })) || [];

  return (
    <form onSubmit={handleSubmit} className="px-5 mb-5 border-b-2 border-cornsilk-300 md:border-none">
      <p className="w-full px-5 flex justify-between text-center mb-3 font-sans text-sm text-gray-600">
        {message}
      </p>
      <div className={fieldClassName}>
        <span className="font-bold">City</span>
        <input
          className={inputClassName}
          type="text"
          value={input?.city}
          onChange={(e) => setInput({ ...input, city: e.target.value })}
        />
      </div>
      <div className={fieldClassName}>
        <span className="font-bold">State</span>
        <div className="relative w-4/5 ml-auto">
          <select
            className={clsx(
              'w-full py-2 px-3 pr-8 block',
              'appearance-none rounded border transition duration-500',
              'bg-gray-50 leading-tight',
              'focus:shadow focus:border-shark focus:outline-none'
            )}
            type="text"
            value={input?.state}
            onChange={(e) => setInput({ ...input, state: e.target.value })}
          >
            {stateOptions.map(({ name, value }) => (
              <option key={`option-${name}`} value={value}>{name}</option>
            ))}
          </select>
          <div className={clsx(
            'flex items-center',
            'pointer-events-none',
            'absolute inset-y-0 right-0 mr-3',
            'text-gray-shark',
          )}>
            <span className="icon-button">
              <i className="fa-solid fa-chevron-down text-xs" />
            </span>
          </div>
        </div>
      </div>
      <div className={fieldClassName}>
        <span className="font-bold">Zip</span>
        <input
          className={inputClassName}
          type="text"
          value={input?.zip}
          onChange={(e) => setInput({ ...input, zip: e.target.value })}
        />
      </div>
      <div className={fieldClassName}>
        <span className="font-bold">Country</span>
        <div className="relative w-4/5 ml-auto">
          <select
            className={clsx(
              'w-full py-2 px-3 pr-8 block',
              'appearance-none rounded border transition duration-500',
              'bg-gray-50 leading-tight',
              'focus:shadow focus:border-shark focus:outline-none'
            )}
            type="text"
            value={input?.country}
            onChange={(e) => setInput({ ...input, country: e.target.value })}
          >
            {countryOptions.map(({ name, value }) => (
              <option key={`option-${name}`} value={value}>{name}</option>
            ))}
          </select>
          <div className={clsx(
            'flex items-center',
            'pointer-events-none',
            'absolute inset-y-0 right-0 mr-3',
            'text-gray-shark',
          )}>
            <span className="icon-button">
              <i className="fa-solid fa-chevron-down text-xs" />
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-3 py-1 mb-5">
        <button
          type="submit"
          className={clsx(
            'secondary-button w-full',
            'disabled:opacity-25 disabled:cursor-not-allowed disabled:text-persian-green-800 disabled:bg-lynch-50'
          )}
          title={!inputValid 
            ? 'Enter valid shipping details above to use shipping calculator.'
            : 'Use shipping calculator to get an shipping total estimate.'}
          disabled={disabled || !inputValid}
        >
          Calculate Shipping
        </button>
      </div>
    </form>
  );
}

function Shipping() {
  const { cart, customer } = useSession();
  const [editing, setEditing] = useState(false);
  const {
    setShippingLocale,
    savingShippingInfo,
    setShippingMethod,
  } = useOtherCartMutations();
  const onShippingLocaleSubmit = async (values) => {
    await setShippingLocale(values);
    setEditing(false);
  };

  if (!cart?.needsShippingAddress) {
    return null;
  }

  const availableShippingRates = (cart?.availableShippingMethods || [])
    .reduce(
      (rates, nextPackage) => {
        rates.push(...(nextPackage?.rates || []));

        return rates;
      },
      [],
    );

  if (customer?.shipping?.postcode && !availableShippingRates.length) {
    return (
      <ShippingLocaleForm
        onSubmit={onShippingLocaleSubmit}
        disabled={savingShippingInfo}
        message="Sorry, we currently are not shipping to your location. Try a different location or at a later date."
      />
    );
  }

  if (customer?.shipping?.postcode && !editing) {
    return (
      <>
        {!editing && <button
          type="button"
          className="font-sans text-xs text-left px-5 mb-2"
          onClick={() => setEditing(true)}
        >
          (Change Address)
        </button>}
        {availableShippingRates.map(({ cost, id, label }) => (
          <div className="radio-button-wrapper mr-4 mb-4 px-5">
            <label className="radio-button-label">
              <input
                type="radio"
                name="shipping-methods"
                value={id}
                className="hidden"
                disabled={savingShippingInfo}
                onChange={(event) => setShippingMethod(event.target.value)}
              />
              <span className="radio-button" />
              {`${label}: `}
              &nbsp;
              <span className="font-bold">{`$${cost}`}</span>
            </label>
          </div>
        ))}
        <div className="w-full flex justify-between px-5 font-sans">
          <span className="font-bold text-lg">Shipping Tax</span>
          <span className="font-bold text-lg">{cart?.shippingTax}</span>
        </div>
        <div className="w-full flex justify-between px-5 font-sans">
          <span className="font-bold text-lg">Shipping Total</span>
          <span className="font-bold text-lg">{cart?.shippingTotal}</span>
        </div>
      </>
    );
  }

  return (
    <ShippingLocaleForm
      onSubmit={onShippingLocaleSubmit}
      disabled={savingShippingInfo}
      message="Shipping and additional costs are calculated based on values you have entered"
    />
  );
}

export default Shipping;
