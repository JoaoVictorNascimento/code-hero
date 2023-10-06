import styles from './Pagination.module.scss'
import usePagination from '../../hooks/usePagination/usePagination';
import { usePaginationContext } from '../../providers/PaginationProvider/PaginationProvider';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number
  buttonPagesToShow: number;
}

const FIRST_PAGE_INDEX = 1;

export default function Pagination({ 
  totalItems, 
  itemsPerPage,
  buttonPagesToShow,
}: PaginationProps) {
  const {
    totalPages,
    visiblePages,
    nextPage,
    prevPage,
    firstPage,
    goToPage,
    lastPage,
  } = usePagination(
    totalItems, 
    itemsPerPage, 
    buttonPagesToShow,
  );

  const { paginationState } = usePaginationContext();

  const renderPagesButton = () => {
    return visiblePages.map((page) => (
      <button
        key={page}
        onClick={() => goToPage(page)}
        className={`${styles.paginationPagesButton} ${page === paginationState.currentPage ? styles.pageButtonSelected : ''}`}
      >
        {page}
      </button>
    ))
  };

  const leftNavigateButtonsClassName = `${styles.navigateButtons} ${paginationState.currentPage === FIRST_PAGE_INDEX ? styles.hiddingButton : ''}`;
  const rightNavigateButtonsClassName = `${styles.navigateButtons} ${paginationState.currentPage === totalPages ? styles.hiddingButton : ''}`

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