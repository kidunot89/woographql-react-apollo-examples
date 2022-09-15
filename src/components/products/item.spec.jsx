import { render } from '@testing-library/react';

import Item from './item';

describe('Item component', () => {
  const mockData = {
    uri: '/product/product',
    name: 'Product',
    onSale: true,
    regularPrice: '$20.00',
    price: '$18.99',
    image: {
      sourceUrl: 'https://place-puppy.com/300x300',
      altText: 'It\'s a dog',
    },
    galleryImages: [],
    type: 'SIMPLE',
    shortDescription: 'short description'
  }
  const { baseElement } = render(<Item data={mockData} />);

  it('renders successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
