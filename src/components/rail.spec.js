import { render } from '@testing-library/react';

import Rail from './rail';

describe('Rail component', () => {
  const { baseElement } = render(<Rail />);

  it('renders successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
