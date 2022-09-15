import { PropsWithChildren } from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  GetAllContentNodesDocument,
  GetPageDocument,
  GetPostDocument,
  GetTopNavDocument,
  NodeByUriDocument,
} from '@axis/graphql';

import {
  fixturesGetTopNav,
  fixturesNodeByUri,
  fixturesGetAllContentNodes,
  fixturesGetPost,
  fixturesGetPage,
} from '@axis/testing/fixtures';

const mocks = [
  {
    request: {
      query: GetTopNavDocument,
    },
    result: {
      data: fixturesGetTopNav(),
    },
  },
  {
    request: {
      query: NodeByUriDocument,
      variables: { uri: '/contributing' },
    },
    result: {
      data: fixturesNodeByUri(),
    },
  },
  {
    request: {
      query: GetAllContentNodesDocument,
    },
    result: {
      data: fixturesGetAllContentNodes(),
    },
  },
  {
    request: {
      query: GetPostDocument,
      variables: { uri: '/hello-world' },
    },
    result: {
      data: fixturesGetPost(),
    },
  },
  {
    request: {
      query: GetPageDocument,
      variables: { uri: '/contributing' },
    },
    result: {
      data: fixturesGetPage(),
    },
  },
];

type ApolloTestProviderProps = {
  addTypename?: boolean;
};

function ApolloTestProvider(props: PropsWithChildren<ApolloTestProviderProps>) {
  const { addTypename = false, children } = props;
  return (
    <MockedProvider mocks={mocks} addTypename={addTypename}>
      {children}
    </MockedProvider>
  );
}

export default ApolloTestProvider;
