import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination = ({ currentPage, totalPages, total, loading, onPrevious, onNext }: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button className={styles.paginationButton} onClick={onPrevious} disabled={currentPage === 1 || loading}>
        Previous
      </button>
      <span className={styles.paginationInfo}>
        Page {currentPage} of {totalPages} ({total} total albums)
      </span>
      <button className={styles.paginationButton} onClick={onNext} disabled={currentPage === totalPages || loading}>
        Next
      </button>
    </div>
  );
};
