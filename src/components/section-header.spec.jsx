import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import SectionHeader from './section-header';

describe('SectionHeader', () => {
  afterAll(() => cleanup());

  const { baseElement } = render(
    <SectionHeader>Test</SectionHeader>,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});