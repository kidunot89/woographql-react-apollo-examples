import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import Navigation from './navigation';

describe('Navigation', () => {
  afterAll(() => cleanup());
  const { baseElement } = render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
