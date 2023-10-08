import { render } from '@testing-library/react';
import { SearchIcon } from './SearchIcon';

describe('SearchIcon', () => {
  it('should render the SearchIcon component', () => {
    const { container } = render(<SearchIcon />);
    
    const svgElement = container.querySelector('svg');
    
    expect(svgElement).toBeInTheDocument();
    
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svgElement).toHaveAttribute('width', '16');
    expect(svgElement).toHaveAttribute('height', '16');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 16 16');
  });
  
  it('should render the SVG path with the correct class', () => {
    const { container } = render(<SearchIcon />);
    
    const pathElement = container.querySelector('path');
    
    expect(pathElement).toBeInTheDocument();
    
    expect(pathElement).toHaveClass('svg');
  });
});