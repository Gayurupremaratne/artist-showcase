import { IconButton, Box } from '@chakra-ui/react';
import { memo } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../../store/favoritesStore';
import type { Song } from '../../types';
import { songCardStyles } from './SongCard.styles';

interface SongCardProps {
  song: Song;
  showAlbum?: boolean;
  showFavorite?: boolean;
  onAlbumClick?: () => void;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const SongCard = memo(({ song, showAlbum = false, showFavorite = true, onAlbumClick }: SongCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const favorite = isFavorite(song.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(song);
  };

  const handleAlbumClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAlbumClick) {
      onAlbumClick();
    } else {
      const encodedAlbum = encodeURIComponent(song.albumName);
      const encodedArtist = encodeURIComponent(song.artistName);
      navigate(`/albums/${encodedAlbum}/${encodedArtist}`);
    }
  };

  return (
    <Box sx={songCardStyles.card}>
      <Box sx={songCardStyles.content}>
        <Box sx={songCardStyles.info}>
          <Box sx={songCardStyles.title}>{song.title}</Box>
          {showAlbum && (
            <Box as="span" sx={songCardStyles.albumLink} onClick={handleAlbumClick}>
              {song.albumName}
            </Box>
          )}
          <Box sx={songCardStyles.meta}>
            <Box as="span">{formatDuration(song.duration)}</Box>
            {song.playCount !== undefined && <Box as="span">Plays: {song.playCount}</Box>}
          </Box>
        </Box>
        {showFavorite && (
          <IconButton
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            icon={favorite ? <FaHeart /> : <FaRegHeart />}
            colorScheme={favorite ? 'red' : 'gray'}
            variant="ghost"
            onClick={handleFavoriteClick}
            size="sm"
            sx={songCardStyles.favoriteButton}
          />
        )}
      </Box>
    </Box>
  );
});

SongCard.displayName = 'SongCard';
