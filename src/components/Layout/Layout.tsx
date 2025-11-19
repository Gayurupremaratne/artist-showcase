import { Container, Box } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { memo } from 'react';
import logo from '../../assets/logo.png';
import { layoutStyles } from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'Albums' },
  { path: '/search', label: 'Search' },
  { path: '/favorites', label: 'Favorites' },
  { path: '/graph', label: 'Best Played' }
];

export const Layout = memo(({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <Box sx={layoutStyles.layout}>
      <Box sx={layoutStyles.header}>
        <Container maxW="container.xl">
          <Box sx={layoutStyles.headerContent}>
            <Box as={RouterLink} to="/" sx={layoutStyles.logoLink}>
              <img src={logo} alt="Artist Showcase" style={layoutStyles.logo} />
            </Box>
            <Box as="nav" sx={layoutStyles.nav}>
              {navItems.map((item) => (
                <Box
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  sx={{
                    ...layoutStyles.navLink,
                    ...(location.pathname === item.path ? layoutStyles.navLinkActive : {}),
                    '@media (min-width: 768px)': {
                      fontSize: '1rem'
                    }
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxW="container.xl" sx={layoutStyles.container}>
        {children}
      </Container>
    </Box>
  );
});

Layout.displayName = 'Layout';
