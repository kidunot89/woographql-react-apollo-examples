import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';
import List from './list';

describe('List', () => {
  afterAll(() => cleanup());
  const { baseElement } = render(
    <List />,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
