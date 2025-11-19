import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { albumsApi } from '../../api/albums';
import { AlbumCard, SearchBar, LoadingSpinner, ErrorMessage, Pagination } from '../../components';
import type { Album } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './BestPlayedGraph.module.css';

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
    <div className={styles.page}>
      <h1 className={styles.title}>{ARTIST_NAME} - Best Played Graph</h1>

      <div className={styles.section}>
        <div className={styles.searchSection}>
          <p className={styles.searchLabel}>Search for {ARTIST_NAME} Album</p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder={`Search ${ARTIST_NAME} albums...`} />
        </div>

        {filteredAlbums.length > 0 && (
          <div className={styles.albumsSection}>
            <p className={styles.albumsLabel}>Select an Album</p>
            <div className={styles.grid}>
              {filteredAlbums.map((album) => (
                <div key={album.id} className={styles.albumCardWrapper}>
                  <AlbumCard album={album} onClick={() => handleAlbumSelect(album)} />
                </div>
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
          </div>
        )}

        {filteredAlbums.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <p className={styles.emptyStateText}>No albums found. Select an album to view play count graph.</p>
          </div>
        )}
      </div>
    </div>
  );
};
