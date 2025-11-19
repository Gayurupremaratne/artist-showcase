import { Image, Badge } from '@chakra-ui/react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Album } from '../../types';
import styles from './AlbumCard.module.css';

interface AlbumCardProps {
  album: Album;
  onClick?: () => void; // Optional custom click handler
}

export const AlbumCard = memo(({ album, onClick: customOnClick }: AlbumCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (customOnClick) {
      // If custom onClick is provided, use it instead of navigation
      customOnClick();
    } else {
      // Default behavior: navigate to album detail page
      const encodedAlbum = encodeURIComponent(album.name);
      const encodedArtist = encodeURIComponent(album.artistName);
      navigate(`/albums/${encodedAlbum}/${encodedArtist}`);
    }
  };

  return (
    <button className={styles.albumCard} onClick={handleClick}>
      <Image src={album.cover} alt={album.name} className={styles.albumImage} fallbackSrc="https://via.placeholder.com/300?text=No+Image" />
      <div className={styles.albumContent}>
        <div className={styles.albumTitle}>{album.name}</div>
        <div className={styles.albumInfo}>
          <span className={styles.artistName}>{album.artistName}</span>
          <Badge className={styles.yearBadge}>{album.year}</Badge>
        </div>
      </div>
    </button>
  );
});

AlbumCard.displayName = 'AlbumCard';
