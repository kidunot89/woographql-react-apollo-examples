import { render } from '@testing-library/react';

import App from './app';

describe('App component', () => {
  const { baseElement } = render(<App />);

  it('renders successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });
});
