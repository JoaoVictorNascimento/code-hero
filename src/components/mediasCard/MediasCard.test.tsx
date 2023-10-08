import { render } from '@testing-library/react';
import MediasCard from './MediasCard';

describe('MediasCard', () => {
  const props = {
    imageUrl: 'image-url.jpg',
    footerText: 'Footer Text',
    altImage: 'Alt Text',
    key: 'unique-key',
  };

  it('should render MediasCard component with correct props', () => {
    const { getByTestId, getByAltText, getByText } = render(<MediasCard {...props} />);
    const mediaCard = getByTestId('media-card');
    const image = getByAltText('Alt Text');
    const footer = getByText('Footer Text');

    expect(mediaCard).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mediaCard).toHaveClass('card');
    expect(image).toHaveAttribute('src', 'image-url.jpg');
    expect(image).toHaveAttribute('alt', 'Alt Text');
    expect(footer).toHaveTextContent('Footer Text');
  });
});