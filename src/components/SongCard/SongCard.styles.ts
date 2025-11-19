export const songCardStyles = {
  card: {
    padding: '1rem',
    bg: 'white',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    width: '100%',
    _hover: {
      bg: '#f7fafc'
    }
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem'
  },
  info: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
    flex: 1,
    minWidth: 0
  },
  title: {
    fontWeight: 600,
    fontSize: '1rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const
  },
  albumLink: {
    fontSize: '0.875rem',
    color: '#4a5568',
    cursor: 'pointer',
    textDecoration: 'none',
    _hover: {
      color: '#3182ce',
      textDecoration: 'underline'
    }
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.75rem',
    color: '#718096'
  },
  favoriteButton: {
    flexShrink: 0
  }
};
