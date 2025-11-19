import { useState, useEffect, useMemo } from 'react';
import { albumsApi } from '../../api/albums';
import { AlbumCard, LoadingSpinner, ErrorMessage, Pagination } from '../../components';
import type { Album, SortOption } from '../../types';
import styles from './AlbumOverview.module.css';

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
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{ARTIST_NAME} Albums</h1>
        <div className={styles.sortContainer}>
          <span className={styles.sortLabel}>Sort by:</span>
          <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
            <option value="name">Name</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      {sortedAlbums.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>No albums found</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {sortedAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
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
    </div>
  );
};
