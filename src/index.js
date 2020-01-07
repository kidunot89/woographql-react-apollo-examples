// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

// Local imports
import App from './components/app';
import introspectionData from './possibleTypes.json';

const typePolicies = {
  RootQuery: {
    queryType: true,
    fields: {
      products: relayStylePagination(['where']),
    },
  },
};

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_ENDPOINT }),
  cache: new InMemoryCache({
    possibleTypes: introspectionData.possibleTypes,
    typePolicies,
  }),
  connectToDevTools: true,
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
