import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout, LoadingSpinner } from './components';

// Lazy load pages for better performance
const AlbumOverview = lazy(() =>
  import('./pages').then((module) => ({
    default: module.AlbumOverview
  }))
);
const AlbumDetail = lazy(() =>
  import('./pages').then((module) => ({
    default: module.AlbumDetail
  }))
);
const Search = lazy(() => import('./pages').then((module) => ({ default: module.Search })));
const Favorites = lazy(() => import('./pages').then((module) => ({ default: module.Favorites })));
const BestPlayedGraph = lazy(() =>
  import('./pages').then((module) => ({
    default: module.BestPlayedGraph
  }))
);

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<AlbumOverview />} />
              <Route path="/albums/:albumName/:artistName" element={<AlbumDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/graph" element={<BestPlayedGraph />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
