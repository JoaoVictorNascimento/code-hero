import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ContentPage from './ContentPage';

const renderContentPage = (children: React.ReactNode) => render(
  <ContentPage>{children}</ContentPage>
);

describe('ContentPage', () => {
  it('should render children content', () => {
    const sampleContent = <div data-testid="sample-content">Sample Content</div>;
    renderContentPage(sampleContent);

    const contentPageElement = screen.getByTestId('content-page');
    const sampleContentElement = screen.getByTestId('sample-content');

    expect(contentPageElement).toBeInTheDocument();
    expect(sampleContentElement).toBeInTheDocument();
    expect(sampleContentElement).toHaveTextContent('Sample Content');
  });
});