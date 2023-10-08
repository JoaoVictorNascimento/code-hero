import { usePaginationContext } from "../../providers/PaginationProvider/PaginationProvider";

interface PaginationResult {
  totalPages: number;
  visiblePages: number[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
}

export default function usePagination(
  totalItems: number, 
  itemsPerPage: number,
  buttonPagesToShow: number,
): PaginationResult {

  const {paginationState, setPaginationState} = usePaginationContext();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPaginationState({currentPage: page});
    }
  };

  const nextPage = () => {
    if (paginationState.currentPage < totalPages) {
      setPaginationState({currentPage: paginationState.currentPage + 1});
    }
  };

  const prevPage = () => {
    if (paginationState.currentPage > 1) {
      setPaginationState({currentPage: paginationState.currentPage - 1});
    }
  };

  const firstPage = () => {
    setPaginationState({currentPage: 1});
  };

  const lastPage = () => {
    setPaginationState({currentPage: totalPages});
  };

  const getVisiblePages = () => {
    const halfPagesToShow = Math.floor(buttonPagesToShow / 2);

    let startPage = paginationState.currentPage - halfPagesToShow;
    let endPage = paginationState.currentPage + halfPagesToShow;

    if (startPage < 1) {
      startPage = 1;
      endPage = buttonPagesToShow;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - buttonPagesToShow + 1;
      if (startPage < 1) startPage = 1;
    }

    const visiblePages = [];

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return {
    totalPages,
    visiblePages: getVisiblePages(),
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
  };
}