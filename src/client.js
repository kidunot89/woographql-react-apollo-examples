import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLClient } from 'graphql-request';

import introspectionData from './possibleTypes.json';

const windowApolloState = typeof window !== 'undefined' ? window.__APOLLO_STATE__ : {};

export const CUSTOMER_CONTENT = gql`
  fragment CustomerContent on Customer {
    id
    sessionToken
    shipping {
      postcode
      state
      city
      country
    }
  }
`;

export const CART_ITEM_CONTENT = gql`
  fragment ProductContentSlice on Product {
    id
    databaseId
    name
    slug
  }

  fragment ProductVariationContentSlice on ProductVariation {
    id
    databaseId
    name
    slug
  }
  fragment CartItemContent on CartItem {
    key
    product {
      node {
        ...ProductContentSlice
      }
    }
    variation {
      node {
        ...ProductVariationContentSlice
      }
    }
    quantity
    total
    subtotal
    subtotalTax
    extraData {
      key
      value
    }
  }
`;
export const CART_CONTENT = gql`
  fragment CartContent on Cart {
    contents(first: 100) {
      itemCount
      nodes {
        ...CartItemContent
      }
    }
    appliedCoupons {
      code
      discountAmount
      discountTax
    }
    needsShippingAddress
    availableShippingMethods {
      packageDetails
      supportsShippingCalculator
      rates {
        id
        instanceId
        methodId
        label
        cost
      }
    }
    subtotal
    subtotalTax
    shippingTax
    shippingTotal
    total
    totalTax
    feeTax
    feeTotal
    discountTax
    discountTotal
  }
  ${CART_ITEM_CONTENT}
`;

export const GET_SESSION = gql`
  query GetSession($customerId: Int) {
    cart {
      ...CartContent
    }
    customer(customerId: $customerId) {
      ...CustomerContent
    }
  }
  ${CART_CONTENT}
  ${CUSTOMER_CONTENT}
`;

const typePolicies = {
  RootQuery: {
    queryType: true,
    fields: {
      products: relayStylePagination(['where']),
    },
  },
};

function createSessionLink() {
  return setContext(async (operation) => {
    const headers = {};
    const sessionToken = localStorage.getItem(process.env.REACT_APP_SESSION_TOKEN_LS_KEY);

    if (sessionToken) {
      headers['woocommerce-session'] = `Session ${sessionToken}`;

      return { headers };
    }

    return {};
  });
}

function createErrorLink() {
  return onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(async ({ path, extensions }) => {
        console.log(path, extensions);
        if (path[0] === 'cart' && extensions.category === 'user') {
          const graphQLClient = new GraphQLClient(process.env.REACT_APP_ENDPOINT);
          
          // Get new Session Token
          const sessionData = await graphQLClient.request(GET_SESSION);
          const sessionToken = sessionData?.customer?.sessionToken;

          // Throw if session token retrieval is failure.
          if (!sessionToken) {
            throw Error('Failed to retrieve a new session token');
          }
          // Remove old session token 
          localStorage.removeItem(process.env.REACT_APP_SESSION_TOKEN_LS_KEY);

          // Save new session and retry operation.
          localStorage.setItem(process.env.REACT_APP_SESSION_TOKEN_LS_KEY, sessionToken)
        
          operation.setContext(({ headers = {} }) => ({
            ...headers,
            'woocommerce-session': `Session ${sessionToken}`
          }));

          return forward(operation);
        }
      });
    }
  });
}

function createApolloClient() {
  const sessionLink = createSessionLink();
  const errorLink = createErrorLink();
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    connectToDevTools: typeof window !== 'undefined',
    link: ApolloLink.from([
      sessionLink,
      errorLink,
      new HttpLink({
        uri: process.env.REACT_APP_ENDPOINT,
      }),
    ]),
    cache: new InMemoryCache({
      possibleTypes: introspectionData.possibleTypes,
      typePolicies: typePolicies,
    }).restore(windowApolloState),
  });
}

export default createApolloClient;