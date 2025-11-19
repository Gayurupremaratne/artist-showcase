import { memo } from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = memo(({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerContent}>
        <div className={styles.spinner}></div>
        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
