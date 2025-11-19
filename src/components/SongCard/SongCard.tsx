import { IconButton } from '@chakra-ui/react';
import { memo } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../../store/favoritesStore';
import type { Song } from '../../types';
import styles from './SongCard.module.css';

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
    <div className={styles.songCard}>
      <div className={styles.songContent}>
        <div className={styles.songInfo}>
          <div className={styles.songTitle}>{song.title}</div>
          {showAlbum && (
            <span className={styles.albumLink} onClick={handleAlbumClick}>
              {song.albumName}
            </span>
          )}
          <div className={styles.songMeta}>
            <span>{formatDuration(song.duration)}</span>
            {song.playCount !== undefined && <span>Plays: {song.playCount}</span>}
          </div>
        </div>
        {showFavorite && (
          <IconButton
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            icon={favorite ? <FaHeart /> : <FaRegHeart />}
            colorScheme={favorite ? 'red' : 'gray'}
            variant="ghost"
            onClick={handleFavoriteClick}
            size="sm"
            className={styles.favoriteButton}
          />
        )}
      </div>
    </div>
  );
});

SongCard.displayName = 'SongCard';
