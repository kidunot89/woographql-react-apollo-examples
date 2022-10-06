import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import { useQuery } from '@apollo/client';
import jwtDecode from 'jwt-decode';

import { GET_SESSION } from '../client';

const initialSession = {
  cart: null,
  customer: null,
  pathToCheckout: false,
  fetchingCart: false,
  setCart: (cart) => {},
  setCustomer: (customer) => {},
  findInCart: (productId, variationId, extraData) => undefined,
};

/**
 * Checks if product matches the provided cart/registry item.
 *
 * @param {number} productId Item product ID.
 * @param {number} variationId Item variation ID.
 * @param {string} extraData Item metadata JSON string.
 * @returns
 */
const cartItemSearch = (
  productId,
  variationId,
  extraData,
  skipMeta = false,
) => ({
  product,
  variation,
  extraData:
  existingExtraData = [],
}) => {
  if (product?.node?.databaseId && productId !== product.node.databaseId) {
    return false;
  }

  if (
    variation?.node?.databaseId
      && variationId !== variation.node.databaseId
  ) {
    return false;
  }

  if (skipMeta) {
    return true;
  }

  if (existingExtraData?.length && !extraData) {
    return false;
  }

  if (!!extraData && typeof extraData === 'string') {
    const decodeMeta = JSON.parse(extraData);
    let found = false;
    Object.entries(decodeMeta).forEach(([targetKey]) => {
      found = !!(existingExtraData)?.find(
        ({ key, value }) => key === targetKey && value === `${decodeMeta[targetKey]}`,
      );
    });

    if (!found) {
      return false;
    }
  }

  return true;
};

export const SessionContext = createContext(initialSession);
const { Provider } = SessionContext;

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
      };
    case 'SET_CUSTOMER':
      return {
        ...state,
        customer: action.payload,
      };
    case 'SET_CHECKOUT_URL':
      return {
        ...state,
        pathToCheckout: action.payload,
      };
    default:
      throw new Error('Invalid action dispatched to session reducer');
  }
};

const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSession);

  const { data, loading: fetchingCart } = useQuery(GET_SESSION);

  useEffect(() => {
    if (data?.cart) {
      dispatch({
        type: 'SET_CART',
        payload: data.cart,
      });
    }

    if (data?.customer) {
      dispatch({
        type: 'SET_CUSTOMER',
        payload: data.customer,
      });
    }

    if (data?.customer?.sessionToken) {
      const decodedToken = jwtDecode(data?.customer?.sessionToken);
      const checkoutUrl = decodedToken?.data?.checkout_url
        ? `${process.env.REACT_APP_CHECKOUT_BASE}${decodedToken.data.checkout_url.replace(/&amp;/g, '&')}`
        : false;

      dispatch({
        type: 'SET_CHECKOUT_URL',
        payload: checkoutUrl,
      });
    }
  }, [data]);

  useEffect(() => {
    const newSessionToken = state.customer?.sessionToken;
    const currentSessionToken = localStorage.getItem(process.env.REACT_APP_SESSION_TOKEN_LS_KEY);
    if (newSessionToken && (!currentSessionToken || currentSessionToken !== newSessionToken)) {
      localStorage.setItem(process.env.REACT_APP_SESSION_TOKEN_LS_KEY, newSessionToken);
    }
  }, [state.customer?.sessionToken]);

  const setCart = (cart) => dispatch({
    type: 'SET_CART',
    payload: cart,
  });

  const setCustomer = (customer) => dispatch({
    type: 'SET_CUSTOMER',
    payload: customer,
  });

  const findInCart = (productId, variationId, extraData) => {
    const items = state?.cart?.contents?.nodes;
    if (!items) {
      return undefined;
    }
    return items.find(cartItemSearch(productId, variationId, extraData, true)) || undefined;
  };

  const store = {
    ...state,
    fetchingCart,
    setCart,
    setCustomer,
    findInCart,
  };
  return (
    <Provider value={store}>{children}</Provider>
  );
}

export default SessionProvider;
export const useSession = () => useContext(SessionContext);
