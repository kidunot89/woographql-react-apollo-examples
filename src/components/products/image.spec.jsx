import '@testing-library/react/dont-cleanup-after-each';
import { render, cleanup } from '@testing-library/react';
import { toMatchDiffSnapshot } from 'snapshot-diff';

import Image from './image';

expect.extend({ toMatchDiffSnapshot });
describe('Image component', () => {
  afterAll(() => cleanup());
  const { baseElement, rerender } = render(<Image />);

  it('renders default image successfully', () => {
    expect(baseElement).toMatchSnapshot();
  });

  it('renders provided successfully', () => {
    const mockData = {
      image: {
        sourceUrl: 'https://place-puppy.com/300x300',
        altText: 'It\'s a dog',
      }
    }
    rerender(<Image data={mockData} />);
    expect(baseElement).toMatchSnapshot();

    expect(
      <Image data={mockData} />
    ).toMatchDiffSnapshot(
      <Image />
    );
  });
});
