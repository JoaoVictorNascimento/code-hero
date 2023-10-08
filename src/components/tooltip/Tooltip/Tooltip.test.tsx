import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Tooltip from './Tooltip';

const renderTooltip = (text = 'Tooltip Text', className = '') => render(
  <Tooltip text={text} className={className}>
    Hover me
  </Tooltip>
);

describe('Tooltip', () => {
  it('should display the tooltip when isVisible is true', () => {
    const { getByTestId } = renderTooltip();

    const tooltipContainer = getByTestId('tooltip');
    fireEvent.mouseEnter(tooltipContainer);

    const tooltipText = screen.getByText('Tooltip Text');
    expect(tooltipText).toBeInTheDocument();
  });

  it('should not display the tooltip when isVisible is false', () => {
    const { queryByText } = renderTooltip();
    
    const tooltipText = queryByText('Tooltip Text');
    expect(tooltipText).not.toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const { getByTestId } = renderTooltip('Custom Text', 'custom-tooltip');

    const tooltipContainer = getByTestId('tooltip');
    fireEvent.mouseEnter(tooltipContainer);

    const customTooltipText = screen.getByText('Custom Text');
    expect(customTooltipText).toBeInTheDocument();

    const tooltipText = screen.getByTestId('tooltip').querySelector('.custom-tooltip');
    expect(tooltipText).toBeInTheDocument();
  });

  it('should hide the tooltip when calling hideTooltip function', () => {
    const { getByTestId } = renderTooltip();
    const tooltipContainer = getByTestId('tooltip');

    fireEvent.mouseEnter(tooltipContainer);

    const tooltipText = screen.getByText('Tooltip Text');
    expect(tooltipText).toBeInTheDocument();

    fireEvent.mouseLeave(tooltipContainer);

    expect(tooltipText).not.toBeInTheDocument();
  });
});