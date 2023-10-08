import { renderHook, act, waitFor } from '@testing-library/react';
import { usePaginationContext } from '../../providers/PaginationProvider/PaginationProvider';
import { PaginationProvider } from '../../providers/PaginationProvider/PaginationProvider';
import { ReactNode } from 'react';
import usePagination from './usePagination';

type WrapperProp = {
  children: ReactNode
}

const wrapper: React.FC<WrapperProp> = ({ children }) => (
  <PaginationProvider>{children}</PaginationProvider>
);

describe('usePagination', () => {
  let setPaginationStateMock: jest.Mock;

  beforeEach(() => {
    setPaginationStateMock = jest.fn();
    jest
      .spyOn(require('../../providers/PaginationProvider/PaginationProvider'), 'usePaginationContext')
      .mockReturnValue({ paginationState: { currentPage: 1 }, setPaginationState: setPaginationStateMock });
  });

  it('should initialize with currentPage 1', () => {
    const { result: resultUsePaginationContext } = renderHook(() => usePaginationContext(), { wrapper });
    const { result: resultUsePagination } = renderHook(() => usePagination(100, 10, 5));

    expect(resultUsePagination.current.totalPages).toBe(10);
    expect(resultUsePagination.current.visiblePages).toEqual([1, 2, 3, 4, 5]);
    expect(resultUsePaginationContext.current.paginationState.currentPage).toBe(1);
  });

  it('should update currentPage when calling goToPage', () => {
    const { result } = renderHook(() => usePagination(100, 10, 5));

    act(() => {
      result.current.goToPage(2);
    });

    expect(setPaginationStateMock).toHaveBeenCalledWith({ currentPage: 2 });
  });

  it('should not allow currentPage to go below 1', () => {
    const { result } = renderHook(() => usePagination(100, 10, 5));

    act(() => {
      result.current.prevPage();
    });

    expect(setPaginationStateMock).not.toHaveBeenCalled();
  });

  it('should not allow currentPage to exceed totalPages', () => {
    const { result } = renderHook(() => usePagination(100, 10, 5));

    act(() => {
      result.current.goToPage(11);
    });

    expect(setPaginationStateMock).not.toHaveBeenCalled();
  });

  it('should go to the first page when calling firstPage', () => {
    const { result: resultUsePaginationContext } = renderHook(() => usePaginationContext(), { wrapper });
    const { result: resultUsePagination } = renderHook(() => usePagination(100, 10, 5));

    act(() => {
      resultUsePaginationContext.current.setPaginationState({ currentPage: 5 });
    });

    act(() => {
      resultUsePagination.current.firstPage();
    });

    expect(setPaginationStateMock).toHaveBeenCalledWith({ currentPage: 1 });
  });

  it('should go to the last page when calling lastPage', () => {
    const { result: resultUsePaginationContext } = renderHook(() => usePaginationContext(), { wrapper });
    const { result: resultUsePagination } = renderHook(() => usePagination(100, 10, 5));

    act(() => {
      resultUsePaginationContext.current.setPaginationState({ currentPage: 5 });
    });

    act(() => {
      resultUsePagination.current.lastPage();
    });

    expect(setPaginationStateMock).toHaveBeenCalledWith({ currentPage: 10 });
  });

  it('should return the correct visiblePages', () => {
    const { result: resultUsePaginationContext } = renderHook(() => usePaginationContext(), { wrapper });
    const { result: resultUsePagination } = renderHook(() => usePagination(100, 10, 5));

    act(() => {
      resultUsePaginationContext.current.setPaginationState({ currentPage: 5 });
    });

    expect(resultUsePagination.current.visiblePages).toEqual([1, 2, 3, 4, 5]);
  });
});