import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

test('Loader component renders without errors', () => {
  const { container } = render(<Loader />);

  expect(container).toBeInTheDocument();
});

test('Loader component has the correct SVG element', () => {
  render(<Loader />);

  const svgElement = screen.getByTestId('loader-svg');

  expect(svgElement).toBeInTheDocument();
});

test('Loader component has the correct CSS class', () => {
  const { container } = render(<Loader />);

  const loadingElement = container.querySelector('.loading');

  expect(loadingElement).toHaveClass('loading');
});