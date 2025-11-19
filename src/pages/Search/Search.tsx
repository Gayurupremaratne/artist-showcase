import { useState, useCallback, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading, Text } from '@chakra-ui/react';
import { searchApi } from '../../api/search';
import { AlbumCard, SongCard, SearchBar, LoadingSpinner, ErrorMessage } from '../../components';
import type { SearchResult } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import { searchStyles } from './Search.styles';

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
    <Box sx={searchStyles.page}>
      <Heading sx={searchStyles.title}>Search</Heading>

      <Box sx={searchStyles.searchContainer}>
        <SearchBar value={query} onChange={setQuery} />
      </Box>

      {loading && <LoadingSpinner message="Searching..." />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && query && !hasResults && (
        <Box sx={searchStyles.emptyState}>
          <Text sx={searchStyles.emptyStateText}>No results found for "{query}"</Text>
        </Box>
      )}

      {!loading && !error && hasResults && filteredResults && (
        <Tabs sx={searchStyles.tabs}>
          <TabList sx={searchStyles.tabList}>
            <Tab>Albums ({filteredResults.albums.length})</Tab>
            <Tab>Songs ({filteredResults.songs.length})</Tab>
          </TabList>

          <TabPanels>
            <TabPanel sx={searchStyles.tabPanel}>
              {filteredResults.albums.length > 0 ? (
                <Box sx={searchStyles.grid}>
                  {filteredResults.albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </Box>
              ) : (
                <Text sx={searchStyles.noResults}>No albums found</Text>
              )}
            </TabPanel>
            <TabPanel sx={searchStyles.tabPanel}>
              {filteredResults.songs.length > 0 ? (
                <Box sx={searchStyles.songsList}>
                  {filteredResults.songs.map((song) => (
                    <SongCard key={song.id} song={song} showAlbum showFavorite />
                  ))}
                </Box>
              ) : (
                <Text sx={searchStyles.noResults}>No songs found</Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {!query && (
        <Box sx={searchStyles.emptyState}>
          <Text sx={searchStyles.emptyStateText}>Enter a search query to find albums and songs</Text>
        </Box>
      )}
    </Box>
  );
};
