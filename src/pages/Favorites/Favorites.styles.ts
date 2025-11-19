export const favoritesStyles = {
  page: {
    width: '100%'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem'
  },
  searchContainer: {
    marginBottom: '1.5rem'
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '3rem 0'
  },
  emptyStateText: {
    fontSize: '1.125rem',
    color: '#718096'
  },
  count: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '0.5rem'
  },
  songsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  }
};
