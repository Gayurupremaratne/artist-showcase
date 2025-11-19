export const albumOverviewStyles = {
  page: {
    width: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap' as const,
    gap: '1rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  sortLabel: {
    fontSize: '0.875rem',
    color: '#4a5568'
  },
  sortSelect: {
    width: '150px',
    bg: 'white',
    padding: '0.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem'
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
  }
};
