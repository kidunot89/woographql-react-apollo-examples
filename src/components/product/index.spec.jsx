import { render } from '@testing-library/react';

import Product from '.';

describe('Product component', () => {
  const { baseElement } = render(<Product />);

  it('renders successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
