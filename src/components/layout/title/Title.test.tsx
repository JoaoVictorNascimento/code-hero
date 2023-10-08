import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Title from './Title';

const renderTitle = (text: string) => render(
  <Title text={text} />
);

describe('Title', () => {
  it('should render with the provided text', () => {
    const titleText = 'Sample Title';
    renderTitle(titleText);

    const titleElement = screen.getByTestId('title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(titleText);
  });
});