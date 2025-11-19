import { useState, useEffect, useMemo } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { albumsApi } from '../../api/albums';
import { AlbumCard, SearchBar, LoadingSpinner, ErrorMessage, Pagination } from '../../components';
import type { Album } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import { bestPlayedGraphStyles } from './BestPlayedGraph.styles';

const ALBUMS_PER_PAGE = 10;
const ARTIST_NAME = import.meta.env.VITE_ARTIST_NAME || 'Kendrick Lamar';

export const BestPlayedGraph = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch artist albums only
        const response = await albumsApi.getAlbumsByArtist(ARTIST_NAME, currentPage, ALBUMS_PER_PAGE);
        setAlbums(response.albums);
        setTotalPages(response.totalPages);
        setTotal(response.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load albums');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [currentPage]);

  const filteredAlbums = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return albums;
    }
    const query = debouncedQuery.toLowerCase();
    return albums.filter((album) => album.name.toLowerCase().includes(query) || album.artistName.toLowerCase().includes(query));
  }, [albums, debouncedQuery]);

  const handleAlbumSelect = (album: Album) => {
    const encodedAlbumName = encodeURIComponent(album.name);
    const encodedArtistName = encodeURIComponent(album.artistName);
    navigate(`/albums/${encodedAlbumName}/${encodedArtistName}`, {
      state: { fromGraph: true }
    });
  };

  if (loading && albums.length === 0) {
    return <LoadingSpinner message="Loading albums..." />;
  }

  if (error && albums.length === 0) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Box sx={bestPlayedGraphStyles.page}>
      <Heading sx={bestPlayedGraphStyles.title}>{ARTIST_NAME} - Best Played Graph</Heading>

      <Box sx={bestPlayedGraphStyles.section}>
        <Box sx={bestPlayedGraphStyles.searchSection}>
          <Text sx={bestPlayedGraphStyles.searchLabel}>Search for {ARTIST_NAME} Album</Text>
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder={`Search ${ARTIST_NAME} albums...`} />
        </Box>

        {filteredAlbums.length > 0 && (
          <Box sx={bestPlayedGraphStyles.albumsSection}>
            <Text sx={bestPlayedGraphStyles.albumsLabel}>Select an Album</Text>
            <Box sx={bestPlayedGraphStyles.grid}>
              {filteredAlbums.map((album) => (
                <Box key={album.id} sx={bestPlayedGraphStyles.albumCardWrapper}>
                  <AlbumCard album={album} onClick={() => handleAlbumSelect(album)} />
                </Box>
              ))}
            </Box>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                total={total}
                loading={loading}
                onPrevious={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                onNext={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              />
            )}
          </Box>
        )}

        {filteredAlbums.length === 0 && !loading && (
          <Box sx={bestPlayedGraphStyles.emptyState}>
            <Text sx={bestPlayedGraphStyles.emptyStateText}>No albums found. Select an album to view play count graph.</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
