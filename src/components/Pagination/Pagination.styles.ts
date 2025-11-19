export const paginationStyles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2rem',
    padding: '1rem 0'
  },
  button: {
    padding: '0.5rem 1rem',
    bg: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'background-color 0.2s',
    _hover: {
      bg: '#2c5aa0'
    },
    _disabled: {
      bg: '#cbd5e0',
      cursor: 'not-allowed',
      opacity: 0.6,
      _hover: {
        bg: '#cbd5e0'
      }
    }
  },
  info: {
    fontSize: '0.875rem',
    color: '#4a5568',
    minWidth: '200px',
    textAlign: 'center' as const
  }
};
