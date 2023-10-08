import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Result from './Result';

const renderResult = (title: string, subTitle: string, typeResult: 'error' | 'warning') => render(
  <Result title={title} subTitle={subTitle} typeResult={typeResult} />
);

describe('Result', () => {
  it('should render with the provided title and subTitle', () => {
    const titleText = 'Sample Title';
    const subTitleText = 'Sample Subtitle';
    renderResult(titleText, subTitleText, 'error');

    const resultElement = screen.getByTestId('result');
    const titleElement = screen.getByText(titleText);
    const subTitleElement = screen.getByText(subTitleText);

    expect(resultElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
  });

  it('should render the correct image based on typeResult', () => {
    renderResult('Sample Title', 'Sample Subtitle', 'error');

    const errorImageElement = screen.getByTestId('result-error');
    expect(errorImageElement).toBeInTheDocument();

    renderResult('Sample Title', 'Sample Subtitle', 'warning');

    const warningImageElement = screen.getByTestId('result-warning');
    expect(warningImageElement).toBeInTheDocument();
  });
});