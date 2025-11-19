import { useMemo, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useFavoritesStore } from '../../store/favoritesStore';
import { SongCard, SearchBar } from '../../components';
import { favoritesStyles } from './Favorites.styles';

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
    <Box sx={favoritesStyles.page}>
      <Heading sx={favoritesStyles.title}>Favorites</Heading>

      <Box sx={favoritesStyles.searchContainer}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search favorites..." />
      </Box>

      {favorites.length === 0 ? (
        <Box sx={favoritesStyles.emptyState}>
          <Text sx={favoritesStyles.emptyStateText}>No favorites yet. Add songs to your favorites list!</Text>
        </Box>
      ) : filteredFavorites.length === 0 ? (
        <Box sx={favoritesStyles.emptyState}>
          <Text sx={favoritesStyles.emptyStateText}>No favorites match your search</Text>
        </Box>
      ) : (
        <Box>
          <Text sx={favoritesStyles.count}>
            {filteredFavorites.length} {filteredFavorites.length === 1 ? 'song' : 'songs'}
          </Text>
          <Box sx={favoritesStyles.songsList}>
            {filteredFavorites.map((song) => (
              <SongCard key={song.id} song={song} showAlbum showFavorite />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
