import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import Spinner from './spinner';

describe('Spinner', () => {
  afterAll(() => cleanup());

  const { baseElement } = render(
    <Spinner>Loading...</Spinner>,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});