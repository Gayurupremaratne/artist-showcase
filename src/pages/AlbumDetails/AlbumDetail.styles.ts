export const albumDetailStyles = {
  page: {
    width: '100%'
  },
  backButton: {
    marginBottom: '1.5rem'
  },
  albumHeader: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap' as const,
    marginBottom: '2rem'
  },
  albumImage: {
    width: '100%',
    maxWidth: '300px',
    height: '300px',
    objectFit: 'cover' as const,
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  albumInfo: {
    flex: 1,
    minWidth: '300px'
  },
  albumTitle: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  artistName: {
    fontSize: '1.25rem',
    color: '#4a5568',
    marginBottom: '0.5rem'
  },
  badges: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap' as const
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: 600
  },
  badgeBlue: {
    bg: '#3182ce',
    color: 'white'
  },
  badgeGreen: {
    bg: '#38a169',
    color: 'white'
  },
  tracksSection: {
    marginTop: '2rem'
  },
  tracksTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  tracksList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  },
  chartSection: {
    marginTop: '2rem'
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
    color: '#718096',
    textAlign: 'center' as const,
    padding: '2rem 0'
  }
};
