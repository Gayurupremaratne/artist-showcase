import { useState, useEffect, useMemo } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { albumsApi } from '../../api/albums';
import { AlbumCard, LoadingSpinner, ErrorMessage, Pagination } from '../../components';
import type { Album, SortOption } from '../../types';
import { albumOverviewStyles } from './AlbumOverview.styles';

const ALBUMS_PER_PAGE = 10;
const ARTIST_NAME = import.meta.env.VITE_ARTIST_NAME || 'Kendrick Lamar';

export const AlbumOverview = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError(null);
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

  const sortedAlbums = useMemo(() => {
    const sorted = [...albums];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'year') {
      sorted.sort((a, b) => b.year - a.year);
    }
    return sorted;
  }, [albums, sortBy]);

  if (loading) {
    return <LoadingSpinner message="Loading albums..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => {
          setError(null);
          setLoading(true);
          albumsApi
            .getAlbumsByArtist(ARTIST_NAME, currentPage, ALBUMS_PER_PAGE)
            .then((response) => {
              setAlbums(response.albums);
              setTotalPages(response.totalPages);
              setTotal(response.total);
            })
            .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load albums'))
            .finally(() => setLoading(false));
        }}
      />
    );
  }

  return (
    <Box sx={albumOverviewStyles.page}>
      <Box sx={albumOverviewStyles.header}>
        <Heading sx={albumOverviewStyles.title}>{ARTIST_NAME} Albums</Heading>
        <Box sx={albumOverviewStyles.sortContainer}>
          <Text as="span" sx={albumOverviewStyles.sortLabel}>
            Sort by:
          </Text>
          <Box
            as="select"
            sx={albumOverviewStyles.sortSelect}
            value={sortBy}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as SortOption)}
          >
            <option value="name">Name</option>
            <option value="year">Year</option>
          </Box>
        </Box>
      </Box>

      {sortedAlbums.length === 0 ? (
        <Box sx={albumOverviewStyles.emptyState}>
          <Text sx={albumOverviewStyles.emptyStateText}>No albums found</Text>
        </Box>
      ) : (
        <>
          <Box sx={albumOverviewStyles.grid}>
            {sortedAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
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
        </>
      )}
    </Box>
  );
};
