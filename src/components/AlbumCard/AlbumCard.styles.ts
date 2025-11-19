export const albumCardStyles = {
  card: {
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '300px',
    border: 'none',
    padding: 0,
    bg: 'white',
    _hover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  },
  image: {
    width: '100%',
    height: '300px',
    objectFit: 'cover' as const
  },
  content: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  artistName: {
    fontSize: '0.875rem',
    color: '#4a5568'
  },
  yearBadge: {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: 600
  }
};
