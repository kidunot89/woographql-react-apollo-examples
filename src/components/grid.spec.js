import { render } from '@testing-library/react';

import Grid from './grid';

describe('Grid component', () => {
  const { baseElement } = render(<Grid />);

  it('renders successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
