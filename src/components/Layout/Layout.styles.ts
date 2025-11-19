export const layoutStyles = {
  layout: {
    minHeight: '100vh',
    bg: '#f7fafc'
  },
  header: {
    bg: 'white',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    borderBottom: '1px solid #e2e8f0'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    flexDirection: { base: 'column' as const, md: 'row' as const },
    gap: { base: '1rem', md: 0 }
  },
  title: {
    fontSize: '1.5rem',
    color: '#2c5282',
    margin: 0
  },
  logoLink: {
    display: 'inline-block',
    textDecoration: 'none'
  },
  logo: {
    height: '4rem',
    width: 'auto'
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap' as const,
    justifyContent: { base: 'center' as const, md: 'flex-start' as const }
  },
  navLink: {
    color: '#4a5568',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.2s',
    _hover: {
      color: '#3182ce'
    }
  },
  navLinkActive: {
    fontWeight: 'bold',
    color: '#2c5282'
  },
  container: {
    padding: '2rem 0'
  }
};
