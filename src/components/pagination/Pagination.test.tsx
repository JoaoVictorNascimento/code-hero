import { render, fireEvent, getAllByTestId, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { PaginationContext, PaginationProvider } from '../../providers/PaginationProvider/PaginationProvider';
import { act } from 'react-dom/test-utils';

describe('Pagination', () => {
  it('should render the pagination component', () => {
    const { getByTestId } = render(
      <PaginationProvider>
        <Pagination totalItems={100} itemsPerPage={10} buttonPagesToShow={5} />
      </PaginationProvider>
    );

    const paginationComponent = getByTestId('pagination');
    expect(paginationComponent).toBeInTheDocument();
  });

  it('should navigate to the next page when clicking the next button', () => {
    const initialState = { currentPage: 2 };

    const setPaginationStateMock = jest.fn();

    const { getByText } = render(
      <PaginationContext.Provider
        value={{ paginationState: initialState, setPaginationState: setPaginationStateMock }}
      >
        <Pagination
          totalItems={100}
          itemsPerPage={10}
          buttonPagesToShow={5}
        />
      </PaginationContext.Provider>
    );

    const nextButton = getByText('>');
    fireEvent.click(nextButton);

    expect(setPaginationStateMock).toHaveBeenCalledWith({ currentPage: 3 });
  });

  it('should navigate to the previous page when clicking the previous button', () => {
    const { getByTestId } = render(
      <PaginationProvider>
        <Pagination totalItems={100} itemsPerPage={10} buttonPagesToShow={5} />
      </PaginationProvider>
    );

    const prevPageButton = getByTestId('prev-page-button');
    const currentPage = getByTestId('current-page');

    act(() => {
      fireEvent.click(prevPageButton);
    });

    expect(currentPage.textContent).toBe('1');
  });

  it('should navigate to the first page when clicking the first button', () => {
    const { getByTestId } = render(
      <PaginationProvider>
        <Pagination totalItems={100} itemsPerPage={10} buttonPagesToShow={5} />
      </PaginationProvider>
    );

    const firstPageButton = getByTestId('first-page-button');
    const currentPage = getByTestId('current-page');

    act(() => {
      fireEvent.click(firstPageButton);
    });

    expect(currentPage.textContent).toBe('1');
  });

  it('should navigate to the last page when clicking the last button', () => {
     const initialState = { currentPage: 1 };

    const setPaginationStateMock = jest.fn();

    const { getByText } = render(
      <PaginationContext.Provider
        value={{ paginationState: initialState, setPaginationState: setPaginationStateMock }}
      >
        <Pagination
          totalItems={100}
          itemsPerPage={10}
          buttonPagesToShow={5}
        />
      </PaginationContext.Provider>
    );

    const lastButton = getByText('>>');
    fireEvent.click(lastButton);

    expect(setPaginationStateMock).toHaveBeenCalledWith({ currentPage: 10 });
  });

  it('should navigate to a specific page when clicking a page button', () => {
    const initialState = { currentPage: 1 };

    const setPaginationStateMock = jest.fn();

    render(
      <PaginationContext.Provider
        value={{ paginationState: initialState, setPaginationState: setPaginationStateMock }}
      >
        <Pagination
          totalItems={100}
          itemsPerPage={10}
          buttonPagesToShow={5}
        />
      </PaginationContext.Provider>
    );

    const navigationsButton = screen.getAllByRole('button');
    fireEvent.click(navigationsButton[4]);

    expect(setPaginationStateMock).toHaveBeenCalledWith({ currentPage: 3 });
  });
});