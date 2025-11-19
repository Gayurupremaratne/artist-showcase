export const errorMessageStyles = {
  container: {
    padding: '1rem'
  },
  alert: {
    bg: '#fed7d7',
    border: '1px solid #fc8181',
    borderRadius: '0.375rem',
    padding: '1rem',
    display: 'flex',
    gap: '0.75rem'
  },
  icon: {
    color: '#e53e3e',
    flexShrink: 0
  },
  content: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    color: '#742a2a',
    marginBottom: '0.5rem'
  },
  message: {
    color: '#742a2a'
  },
  retryButton: {
    marginTop: '0.5rem',
    color: '#742a2a',
    textDecoration: 'underline',
    cursor: 'pointer',
    bg: 'none',
    border: 'none',
    padding: 0,
    fontSize: 'inherit',
    _hover: {
      color: '#c53030'
    }
  }
};
