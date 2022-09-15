import { render } from '@testing-library/react';

import ProductsList from '.';

describe('ProductsList component', () => {
  const { baseElement } = render(<ProductsList />);

  it('renders successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
