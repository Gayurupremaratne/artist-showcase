import { Image, Badge, Box } from '@chakra-ui/react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Album } from '../../types';
import { albumCardStyles } from './AlbumCard.styles';

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
    <Box as="button" sx={albumCardStyles.card} onClick={handleClick}>
      <Image src={album.cover} alt={album.name} sx={albumCardStyles.image} fallbackSrc="https://via.placeholder.com/300?text=No+Image" />
      <Box sx={albumCardStyles.content}>
        <Box sx={albumCardStyles.title}>{album.name}</Box>
        <Box sx={albumCardStyles.info}>
          <Box as="span" sx={albumCardStyles.artistName}>
            {album.artistName}
          </Box>
          <Badge sx={albumCardStyles.yearBadge}>{album.year}</Badge>
        </Box>
      </Box>
    </Box>
  );
});

AlbumCard.displayName = 'AlbumCard';
