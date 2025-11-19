export const bestPlayedGraphStyles = {
  page: {
    width: '100%'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem'
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem'
  },
  searchSection: {
    marginBottom: '1.5rem'
  },
  searchLabel: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '0.5rem'
  },
  albumsSection: {
    marginBottom: '1.5rem'
  },
  albumsLabel: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      base: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)'
    },
    gap: '1rem'
  },
  albumCardWrapper: {
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    _hover: {
      opacity: 1
    }
  },
  albumCardWrapperSelected: {
    opacity: 1
  },
  albumCardWrapperUnselected: {
    opacity: 0.7
  },
  chartSection: {
    marginTop: '1.5rem'
  },
  chartTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  chartContainer: {
    bg: 'white',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    width: '100%',
    minHeight: '450px',
    height: '450px'
  },
  noData: {
    color: '#718096'
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '3rem 0'
  },
  emptyStateText: {
    fontSize: '1.125rem',
    color: '#718096'
  }
};
