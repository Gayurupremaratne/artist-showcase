import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, Image, Box, Heading, Text, Badge } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { albumsApi } from '../../api/albums';
import { SongCard, LoadingSpinner, ErrorMessage } from '../../components';
import type { AlbumDetail as AlbumDetailType } from '../../types';
import { albumDetailStyles } from './AlbumDetail.styles';
import { v4 as uuidv4 } from 'uuid';

export const AlbumDetail = () => {
  const { albumName, artistName } = useParams<{
    albumName: string;
    artistName: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [album, setAlbum] = useState<AlbumDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user came from /graph page
  const fromGraph = (location.state as { fromGraph?: boolean })?.fromGraph ?? false;

  // Prepare chart data if coming from graph page
  const chartData = useMemo(() => {
    if (!fromGraph || !album || !album.songs) {
      return [];
    }
    return album.songs
      .map((song) => ({
        name: song.title,
        plays: song.playCount || 0
      }))
      .sort((a, b) => b.plays - a.plays);
  }, [album, fromGraph]);

  useEffect(() => {
    if (!albumName || !artistName) {
      setError('Album name and artist name are required');
      setLoading(false);
      return;
    }

    const fetchAlbum = async () => {
      try {
        setLoading(true);
        setError(null);
        const decodedAlbumName = decodeURIComponent(albumName);
        const decodedArtistName = decodeURIComponent(artistName);
        const data = await albumsApi.getAlbumDetail(decodedAlbumName, decodedArtistName);
        setAlbum(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load album');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumName, artistName]);

  if (loading) {
    return <LoadingSpinner message="Loading album details..." />;
  }

  if (error || !album) {
    return (
      <ErrorMessage
        message={error || 'Album not found'}
        onRetry={() => {
          if (albumName && artistName) {
            setError(null);
            setLoading(true);
            const decodedAlbumName = decodeURIComponent(albumName);
            const decodedArtistName = decodeURIComponent(artistName);
            albumsApi
              .getAlbumDetail(decodedAlbumName, decodedArtistName)
              .then(setAlbum)
              .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load album'))
              .finally(() => setLoading(false));
          }
        }}
      />
    );
  }

  return (
    <Box sx={albumDetailStyles.page}>
      <Button leftIcon={<FaArrowLeft />} variant="ghost" sx={albumDetailStyles.backButton} onClick={() => navigate(-1)}>
        Back
      </Button>

      <Box sx={albumDetailStyles.albumHeader}>
        <Image
          src={album.cover}
          alt={album.name}
          sx={albumDetailStyles.albumImage}
          fallbackSrc="https://via.placeholder.com/300?text=No+Image"
        />

        <Box sx={albumDetailStyles.albumInfo}>
          <Heading sx={albumDetailStyles.albumTitle}>{album.name}</Heading>
          <Text sx={albumDetailStyles.artistName}>{album.artistName}</Text>
          <Box sx={albumDetailStyles.badges}>
            <Badge sx={{ ...albumDetailStyles.badge, ...albumDetailStyles.badgeBlue }}>{album.year}</Badge>
            {album.playCount !== undefined && (
              <Badge sx={{ ...albumDetailStyles.badge, ...albumDetailStyles.badgeGreen }}>{album.playCount} plays</Badge>
            )}
          </Box>
        </Box>
      </Box>

      {fromGraph && chartData.length > 0 && (
        <Box sx={albumDetailStyles.chartSection}>
          <Heading sx={albumDetailStyles.chartTitle}>{album.name} - Play Count</Heading>
          <Box sx={albumDetailStyles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} interval={0} tick={{ fontSize: 12 }} />
                <YAxis
                  label={{
                    value: 'Play Count',
                    angle: -90,
                    position: 'insideLeft'
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="plays" fill="#3182ce" name="Plays" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      )}

      {fromGraph && chartData.length === 0 && (
        <Box sx={albumDetailStyles.chartSection}>
          <Text sx={albumDetailStyles.noData}>No play count data available for this album</Text>
        </Box>
      )}

      <Box sx={albumDetailStyles.tracksSection}>
        <Heading sx={albumDetailStyles.tracksTitle}>Track List ({album.songs.length})</Heading>
        <Box sx={albumDetailStyles.tracksList}>
          {album.songs.map((song) => (
            <SongCard key={uuidv4()} song={song} showFavorite />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
