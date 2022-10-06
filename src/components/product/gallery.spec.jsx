import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';

import { mockProduct } from '../../testing/mocks';
import ProductGallery from './gallery';

describe('ProductGallery', () => {
  afterAll(() => cleanup());
  const { baseElement } = render(
    <ProductGallery
      className="w-full h-full"
      main={mockProduct?.image}
      images={mockProduct?.galleryImages?.nodes}
    />,
  );

  it('should render successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
