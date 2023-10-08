import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './Header';

describe('Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('should render the Header', () => {
    const logoElement = screen.getByAltText('obj logo');
    expect(logoElement).toBeInTheDocument();
  });

  it('should render the ExtraContent component', () => {
    const extraContentElement = screen.getByTestId('extra-content');
    const userName = screen.queryByText('João Victor Nascimento');
    const frontTestText = screen.queryByText('Teste de Front-end');
    const cb = screen.queryByText('CB');

    expect(extraContentElement).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(frontTestText).toBeInTheDocument();
    expect(cb).toBeInTheDocument();
  });
});