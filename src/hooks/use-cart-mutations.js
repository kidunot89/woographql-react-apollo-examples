import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import {
  GET_SESSION,
  CUSTOMER_CONTENT,
  CART_ITEM_CONTENT,
  CART_CONTENT,
} from '../client';

import { useSession } from '../components/session-provider';

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: Int!, $variationId: Int, $quantity: Int, $extraData: String) {
    addToCart(
      input: {productId: $productId, variationId: $variationId, quantity: $quantity, extraData: $extraData}
    ) {
      cart {
        ...CartContent
      }
      cartItem {
        ...CartItemContent
      }
    }
  }
  ${CART_ITEM_CONTENT}
  ${CART_CONTENT}
`;

export const UPDATE_CART_ITEM_QUANTITIES = gql`
  mutation UpdateCartItemQuantities($items: [CartItemQuantityInput]) {
    updateItemQuantities(input: {items: $items}) {
      cart {
        ...CartContent
      }
      items {
        ...CartItemContent
      }
    }
  }
  ${CART_ITEM_CONTENT}
  ${CART_CONTENT}
`;

export const REMOVE_ITEMS_FROM_CART = gql`
  mutation RemoveItemsFromCart($keys: [ID], $all: Boolean) {
    removeItemsFromCart(input: {keys: $keys, all: $all}) {
      cart {
        ...CartContent
      }
      cartItems {
        ...CartItemContent
      }
    }
  }
  ${CART_ITEM_CONTENT}
  ${CART_CONTENT}
`;

export const APPLY_COUPON_TO_CART = gql`
  mutation ApplyCouponToCart($code: String!) {
    applyCoupon(input: {code: $code}) {
      cart {
        ...CartContent
      }
    }
  }
  ${CART_CONTENT}
`;

export const REMOVE_COUPON_FROM_CART = gql`
  mutation RemoveCouponFromCart($code: String!) {
    removeCoupons(input: {codes: [$code]}) {
      cart {
        ...CartContent
      }
    }
  }
  ${CART_CONTENT}
`;
export const REMOVE_COUPONS_FROM_CART = gql`
  mutation RemoveCouponsFromCart($codes: [String!]) {
    removeCoupons(input: {codes: $codes}) {
      cart {
        ...CartContent
      }
    }
  }
  ${CART_CONTENT}
`;

export const SET_SHIPPING_LOCALE = gql`
  mutation SetShippingLocale($zip: String!, $state: String, $city: String, $country: CountriesEnum) {
    updateCustomer(
      input: {shipping: {postcode: $zip, country: $country, state: $state, city: $city}}
    ) {
      customer {
        ...CustomerContent
      }
    }
  }
  ${CUSTOMER_CONTENT}
`;

export const SET_SHIPPING_METHOD = gql`
  mutation SetShippingMethod($shippingMethod: String!) {
    updateShippingMethod(input: {shippingMethods: [$shippingMethod]}) {
      cart {
        ...CartContent
      }
    }
  }
  ${CART_CONTENT}
`;

const useAddToCartMutation = (options) => useMutation(ADD_TO_CART, options);
const useUpdateCartItemQuantitiesMutation = (options) => useMutation(UPDATE_CART_ITEM_QUANTITIES, options);
const useRemoveItemsFromCartMutation = (options) => useMutation(REMOVE_ITEMS_FROM_CART, options);
const useApplyCouponToCartMutation = (options) => useMutation(APPLY_COUPON_TO_CART, options);
const useRemoveCouponFromCartMutation = (options) => useMutation(REMOVE_COUPON_FROM_CART, options);
const useSetShippingLocaleMutation = (options) => useMutation(SET_SHIPPING_LOCALE, options);
const useSetShippingMethodMutation = (options) => useMutation(SET_SHIPPING_METHOD, options);

const useCartMutations = (productId, variationId, extraData) => {
  const {
    cart,
    setCart,
    findInCart,
  } = useSession();
  const [quantityFound, setQuantityInCart] = useState(
    findInCart(productId, variationId, extraData)?.quantity || 0,
  );

  const [addToCart, { loading: adding }] = useAddToCartMutation({
    onCompleted({ addToCart: data }) {
      if (data?.cart) {
        setCart(data.cart);
      }
    },
  });
  const [updateQuantity, { loading: updating }] = useUpdateCartItemQuantitiesMutation({
    onCompleted({ updateItemQuantities: data }) {
      if (data?.cart) {
        setCart(data.cart);
      }
    },
  });
  const [removeCartItem, { loading: removing }] = useRemoveItemsFromCartMutation({
    onCompleted({ removeItemsFromCart: data }) {
      if (data?.cart) {
        setCart(data.cart);
      }
    },
  });

  useEffect(() => {
    setQuantityInCart(
      findInCart(productId, variationId, extraData)?.quantity || 0,
    );
  }, [productId, variationId, extraData, cart?.contents?.nodes]);

  const mutate = async (values) => {
    const {
      quantity,
      all = false,
      mutation = 'update',
    } = values;

    if (!cart) {
      throw new Error('No cart.');
    }

    if (!productId) {
      throw new Error('No item provided.');
      // TODO: Send error to Sentry.IO.
    }

    switch (mutation) {
      case 'remove': {
        if (!quantityFound) {
          throw new Error('Provided item not in cart');
        }

        const item = findInCart(
          productId,
          variationId,
          extraData,
        );

        if (!item) {
          throw new Error('Failed to find item in cart.');
        }

        const { key } = item;
        removeCartItem({ variables: { keys: [key], all } });
        break;
      }
      case 'update':
      default:
        if (quantityFound) {
          const item = findInCart(
            productId,
            variationId,
            extraData,
          );

          if (!item) {
            throw new Error('Failed to find item in cart.');
          }

          const { key } = item;
          updateQuantity({ variables: { items: [{ key, quantity }] } });
        } else {
          addToCart({
            variables: {
              quantity,
              productId,
              variationId,
              extraData,
            },
          });
        }
        break;
    }
  };

  const removeCartItemHelper = () => {
    const item = findInCart(productId, variationId, extraData);

    if (!item) {
      throw new Error('Failed to find item in cart.');
    }

    removeCartItem({ variables: { keys: [item.key] } });
  };

  const updateQuantityHelper = (quantity) => {
    const item = findInCart(productId, variationId, extraData);

    if (!item) {
      throw new Error('Failed to find item in cart.');
    }

    updateQuantity({ variables: { items: [{ key: item.key, quantity }] } });
  };

  const addToCartHelper = (
    pId,
    quantity,
    vId,
    e,
  ) => {
    addToCart({
      variables: {
        productId: pId,
        quantity,
        variationId: vId,
        extraData: e,
      },
    });
  };

  const store = {
    adding,
    updating,
    removing,
    executing: adding | updating | removing,
    quantityFound,
    mutate,
    addToCart: addToCartHelper,
    removeCartItem: removeCartItemHelper,
    updateQuantity: updateQuantityHelper,
  };

  return store;
};

export const useOtherCartMutations = () => {
  const {
    setCart,
    setCustomer,
  } = useSession();

  const [applyCouponToCart, { loading: applyingCoupon }] = useApplyCouponToCartMutation({
    refetchQueries: [GET_SESSION],
    onCompleted({ applyCoupon: data }) {
      if (data?.cart) {
        setCart(data.cart);
      }
    },
  });

  const [removeCouponFromCart, { loading: removingCoupon }] = useRemoveCouponFromCartMutation({
    refetchQueries: [GET_SESSION],
    onCompleted({ removeCoupons: data }) {
      if (data?.cart) {
        setCart(data.cart);
      }
    },
  });

  const [setShippingLocale, { loading: savingShippingLocale }] = useSetShippingLocaleMutation({
    refetchQueries: [GET_SESSION],
    onCompleted({ updateCustomer: data }) {
      if (data?.customer) {
        setCustomer(data.customer);
      }
    },
  });

  const [setShippingMethod, { loading: savingShippingMethod }] = useSetShippingMethodMutation({
    refetchQueries: [GET_SESSION],
    onCompleted({ updateShippingMethod: data }) {
      if (data?.cart) {
        setCart(data.cart);
      }
    },
  });

  const applyCouponHelper = (code) => applyCouponToCart({ variables: { code } });
  const removeCouponHelper = (code) => removeCouponFromCart({ variables: { code } });
  const setShippingLocaleHelper = (input) => setShippingLocale({
    variables: {
      ...input,
    },
  });

  const setShippingMethodHelper = (shippingMethod) => setShippingMethod({
    variables: { shippingMethod },
  });

  const store = {
    applyingCoupon,
    removingCoupon,
    savingShippingInfo: savingShippingLocale || savingShippingMethod,
    applyCoupon: applyCouponHelper,
    removeCoupon: removeCouponHelper,
    setShippingLocale: setShippingLocaleHelper,
    setShippingMethod: setShippingMethodHelper,
  };

  return store;
};

export default useCartMutations;
