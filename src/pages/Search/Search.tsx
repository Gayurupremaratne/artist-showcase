import { useState, useCallback, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { searchApi } from '../../api/search';
import { AlbumCard, SongCard, SearchBar, LoadingSpinner, ErrorMessage } from '../../components';
import type { SearchResult } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Search.module.css';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchApi.search(searchQuery);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    } else {
      setResults(null);
      setLoading(false);
    }
  }, [debouncedQuery, performSearch]);

  // Filter results to only include Artist albums and songs
  const artistName = (import.meta.env.VITE_ARTIST_NAME || 'Kendrick Lamar').toLowerCase();
  const filteredResults = results
    ? {
        albums: results.albums.filter((album) => album.artistName.toLowerCase().includes(artistName)),
        songs: results.songs.filter((song) => song.artistName.toLowerCase().includes(artistName))
      }
    : null;

  const hasResults = filteredResults && (filteredResults.albums.length > 0 || filteredResults.songs.length > 0);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Search</h1>

      <div className={styles.searchContainer}>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading && <LoadingSpinner message="Searching..." />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && query && !hasResults && (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>No results found for "{query}"</p>
        </div>
      )}

      {!loading && !error && hasResults && filteredResults && (
        <Tabs className={styles.tabs}>
          <TabList className={styles.tabList}>
            <Tab>Albums ({filteredResults.albums.length})</Tab>
            <Tab>Songs ({filteredResults.songs.length})</Tab>
          </TabList>

          <TabPanels>
            <TabPanel className={styles.tabPanel}>
              {filteredResults.albums.length > 0 ? (
                <div className={styles.grid}>
                  {filteredResults.albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </div>
              ) : (
                <p className={styles.noResults}>No albums found</p>
              )}
            </TabPanel>
            <TabPanel className={styles.tabPanel}>
              {filteredResults.songs.length > 0 ? (
                <div className={styles.songsList}>
                  {filteredResults.songs.map((song) => (
                    <SongCard key={song.id} song={song} showAlbum showFavorite />
                  ))}
                </div>
              ) : (
                <p className={styles.noResults}>No songs found</p>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {!query && (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>Enter a search query to find albums and songs</p>
        </div>
      )}
    </div>
  );
};
