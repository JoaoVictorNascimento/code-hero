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
        onClick={() => onClickNavigationPage(firstPage)}
        className={leftNavigateButtonsClassName}
      >
        {"<<"}
      </button>
      <button
        onClick={() => onClickNavigationPage(prevPage)}
        className={leftNavigateButtonsClassName}
      >
        {"<"}
      </button>
      {renderPagesButton()}
      <button
        onClick={() => onClickNavigationPage(nextPage)}
        className={rightNavigateButtonsClassName}
      >
        {">"}
      </button>
      <button
        onClick={() => onClickNavigationPage(lastPage)}
        className={rightNavigateButtonsClassName}
      >
        {">>"}
      </button>
    </div>
  );
};