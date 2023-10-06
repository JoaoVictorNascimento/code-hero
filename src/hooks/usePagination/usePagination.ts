import { useState } from 'react';

interface PaginationResult {
  currentPage: number;
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
  pagesToShow : number,
): PaginationResult {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(totalPages);
  };

  const getVisiblePages = () => {
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    let startPage = currentPage - halfPagesToShow;
    let endPage = currentPage + halfPagesToShow;

    if (startPage < 1) {
      startPage = 1;
      endPage = pagesToShow;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - pagesToShow + 1;
      if (startPage < 1) startPage = 1;
    }

    const visiblePages = [];

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return {
    currentPage,
    totalPages,
    visiblePages: getVisiblePages(),
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
  };
}