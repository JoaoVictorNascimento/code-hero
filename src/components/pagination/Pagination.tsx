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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const { paginationState } = usePaginationContext();

  const onClickNavigationPage = (onClick: () => void) => {
    scrollToTop();
    onClick();
  }

  const renderPagesButton = () => {
    return visiblePages.map((page) => (
      <button
        key={page}
        onClick={() => {
          scrollToTop();
          goToPage(page);
        }}
        className={`${styles.paginationPagesButton} ${page === paginationState.currentPage ? styles.pageButtonSelected : ''}`}
        data-testid={`${page === paginationState.currentPage ? 'current-page' : `page-button-${page}`}`}
      >
        {page}
      </button>
    ))
  };

  const leftNavigateButtonsClassName = `${styles.navigateButtons} ${paginationState.currentPage === FIRST_PAGE_INDEX ? styles.hiddingButton : ''}`;
  const rightNavigateButtonsClassName = `${styles.navigateButtons} ${paginationState.currentPage === totalPages ? styles.hiddingButton : ''}`

  return (
    <div 
      className={styles.pagination}
      data-testid="pagination"
    >
      <button
        onClick={() => onClickNavigationPage(firstPage)}
        className={leftNavigateButtonsClassName}
        data-testid="first-page-button"
      >
        {"<<"}
      </button>
      <button
        onClick={() => onClickNavigationPage(prevPage)}
        className={leftNavigateButtonsClassName}
        data-testid="prev-page-button"
      >
        {"<"}
      </button>
      {renderPagesButton()}
      <button
        onClick={() => onClickNavigationPage(nextPage)}
        className={rightNavigateButtonsClassName}
        data-testid="next-page-button"
      >
        {">"}
      </button>
      <button
        onClick={() => onClickNavigationPage(lastPage)}
        className={rightNavigateButtonsClassName}
        data-testid="last-page-button"
      >
        {">>"}
      </button>
    </div>
  );
};