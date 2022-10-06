import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import Logo from './logo';

describe('Logo component', () => {
  afterAll(() => cleanup());
  const { baseElement } = render(
    <Logo />,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
