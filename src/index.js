// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';


// Local imports
import App from './components/app';
import introspectionData from './possibleTypes.json';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_ENDPOINT }),
  cache: new InMemoryCache({
    possibleTypes: introspectionData.possibleTypes,
  }),
  connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
document.getElementById('root'));
