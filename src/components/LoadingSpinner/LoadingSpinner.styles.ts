export const loadingSpinnerStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    alignItems: 'center'
  },
  spinner: {
    width: '3rem',
    height: '3rem',
    border: '4px solid #e2e8f0',
    borderTopColor: '#3182ce',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  message: {
    color: '#4a5568'
  }
};
