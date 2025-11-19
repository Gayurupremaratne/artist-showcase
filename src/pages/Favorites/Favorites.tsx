import { useMemo, useState } from 'react';
import { useFavoritesStore } from '../../store/favoritesStore';
import { SongCard, SearchBar } from '../../components';
import styles from './Favorites.module.css';

export const Favorites = () => {
  const { favorites } = useFavoritesStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) {
      return favorites;
    }
    const query = searchQuery.toLowerCase();
    return favorites.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.albumName.toLowerCase().includes(query) ||
        song.artistName.toLowerCase().includes(query)
    );
  }, [favorites, searchQuery]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Favorites</h1>

      <div className={styles.searchContainer}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search favorites..." />
      </div>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>No favorites yet. Add songs to your favorites list!</p>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>No favorites match your search</p>
        </div>
      ) : (
        <div>
          <p className={styles.count}>
            {filteredFavorites.length} {filteredFavorites.length === 1 ? 'song' : 'songs'}
          </p>
          <div className={styles.songsList}>
            {filteredFavorites.map((song) => (
              <SongCard key={song.id} song={song} showAlbum showFavorite />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
