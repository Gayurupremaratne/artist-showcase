import { memo } from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = memo(({ title = 'Error', message, onRetry }: ErrorMessageProps) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorAlert}>
        <div className={styles.errorIcon}>⚠</div>
        <div className={styles.errorContent}>
          <div className={styles.errorTitle}>{title}</div>
          <div className={styles.errorMessage}>{message}</div>
          {onRetry && (
            <button onClick={onRetry} className={styles.retryButton}>
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';
