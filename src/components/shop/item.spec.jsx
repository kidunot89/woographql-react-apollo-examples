import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockProduct } from '../../testing/mocks';

import Item from './item';

describe('Item component', () => {
  const { baseElement } = render(
    <MemoryRouter>
      <Item data={mockProduct} />
    </MemoryRouter>
  );

  it('renders successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
