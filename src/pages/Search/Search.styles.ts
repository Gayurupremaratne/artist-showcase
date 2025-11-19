export const searchStyles = {
  page: {
    width: '100%'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem'
  },
  searchContainer: {
    marginBottom: '2rem'
  },
  tabs: {
    width: '100%'
  },
  tabList: {
    borderBottom: '1px solid #e2e8f0'
  },
  tabPanel: {
    padding: 0,
    marginTop: '1rem'
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '3rem 0'
  },
  emptyStateText: {
    fontSize: '1.125rem',
    color: '#718096'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      base: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)'
    },
    gap: '1.5rem'
  },
  songsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  },
  noResults: {
    color: '#718096'
  }
};
