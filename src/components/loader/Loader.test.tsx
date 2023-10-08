import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

test('Loader component renders without errors', () => {
  // Render the Loader component
  const { container } = render(<Loader />);

  // Ensure the component renders without errors
  expect(container).toBeInTheDocument();
});

test('Loader component has the correct SVG element', () => {
  // Render the Loader component
  render(<Loader />);

  // Find the SVG element by its test ID
  const svgElement = screen.getByTestId('loader-svg');

  // Ensure the SVG element is present
  expect(svgElement).toBeInTheDocument();
});

test('Loader component has the correct CSS class', () => {
  // Render the Loader component
  const { container } = render(<Loader />);

  // Find the root element of the component by its CSS class
  const loadingElement = container.querySelector('.loading');

  // Ensure the root element has the correct CSS class
  expect(loadingElement).toHaveClass('loading');
});