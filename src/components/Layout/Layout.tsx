import { Container } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { memo } from 'react';
import logo from '../../assets/logo.png';
import styles from './Layout.module.css';

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
    <div className={styles.layout}>
      <div className={styles.header}>
        <Container maxW="container.xl">
          <div className={styles.headerContent}>
            <RouterLink to="/" className={styles.logoLink}>
              <img src={logo} alt="Artist Showcase" className={styles.logo} />
            </RouterLink>
            <nav className={styles.nav}>
              {navItems.map((item) => (
                <RouterLink
                  key={item.path}
                  to={item.path}
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.navLinkActive : ''}`}
                >
                  {item.label}
                </RouterLink>
              ))}
            </nav>
          </div>
        </Container>
      </div>
      <Container maxW="container.xl" className={styles.container}>
        {children}
      </Container>
    </div>
  );
});

Layout.displayName = 'Layout';
