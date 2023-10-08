import { render, fireEvent } from '@testing-library/react';
import InputSearch from './InputSearch';

describe('InputSearch', () => {
  it('should update input value when user types', () => {
    const onSearchedValueMock = jest.fn();
    const { getByPlaceholderText } = render(
      <InputSearch
        inputId="search"
        label="Search"
        onSearchedValue={onSearchedValueMock}
      />
    );

    const inputElement = getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test input' } });

    expect(inputElement.value).toBe('test input');
  });

  it('should call onSearchedValue when user types', () => {
    const onSearchedValueMock = jest.fn();
    const { getByPlaceholderText } = render(
      <InputSearch
        inputId="search"
        label="Search"
        onSearchedValue={onSearchedValueMock}
      />
    );

    const inputElement = getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'test input' } });

    expect(onSearchedValueMock).toHaveBeenCalledWith('test input');
  });

  it('should render with correct label', () => {
    const onSearchedValueMock = jest.fn();
    const { getByText } = render(
      <InputSearch
        inputId="search"
        label="Search Label"
        onSearchedValue={onSearchedValueMock}
      />
    );

    const labelElement = getByText('Search Label');

    expect(labelElement).toBeInTheDocument();
  });
});