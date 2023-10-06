import styles from './Pagination.module.scss'
import usePagination from '../../hooks/usePagination/usePagination';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number
  onPageChange: (page: number) => void;
  buttonPagesToShow: number;
}

const FIRST_PAGE_INDEX = 1;

export default function Pagination({ 
  totalItems, 
  itemsPerPage,
  onPageChange,
  buttonPagesToShow,
}: PaginationProps) {
  const {
    currentPage,
    totalPages,
    visiblePages,
    nextPage,
    prevPage,
    firstPage,
    goToPage,
    lastPage,
  } = usePagination(totalItems, itemsPerPage, buttonPagesToShow);

  const renderPagesButton = () => {

    return visiblePages.map((page) => (
      <button
        key={page}
        onClick={() => goToPage(page)}
        className={`${styles.paginationPagesButton} ${page === currentPage ? styles.pageButtonSelected : ''}`}
      >
        {page}
      </button>
    ))
  };

  const leftNavigateButtonsClassName = `${styles.navigateButtons} ${currentPage === FIRST_PAGE_INDEX ? styles.hiddingButton : ''}`;
  const rightNavigateButtonsClassName = `${styles.navigateButtons} ${currentPage === totalPages ? styles.hiddingButton : ''}`

  return (
    <div className={styles.pagination}>
      <button
        onClick={firstPage}
        className={leftNavigateButtonsClassName}
      >
        {"<<"}
      </button>
      <button
        onClick={prevPage}
        className={leftNavigateButtonsClassName}
      >
        {"<"}
      </button>
      {renderPagesButton()}
      <button
        onClick={nextPage}
        className={rightNavigateButtonsClassName}
      >
        {">"}
      </button>
      <button
        onClick={lastPage}
        className={rightNavigateButtonsClassName}
      >
        {">>"}
      </button>
    </div>
  );
};