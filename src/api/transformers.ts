import { v4 as uuidv4 } from 'uuid';
import type { Album, Song } from '../types';

interface LastFmImage {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | '';
}

interface LastFmAlbum {
  name: string;
  artist: string;
  mbid?: string;
  url: string;
  image?: LastFmImage[];
  playcount?: string;
  '@attr'?: {
    rank?: string;
  };
}

interface LastFmTrack {
  name: string;
  artist: string;
  album?: {
    '#text': string;
    mbid?: string;
  };
  mbid?: string;
  url: string;
  duration?: string;
  playcount?: string;
  '@attr'?: {
    rank?: string;
    position?: string;
  };
}

// Helper to get image URL from Last.fm image array
const getImageUrl = (images: LastFmImage[] | undefined): string => {
  if (!images || images.length === 0) {
    return 'https://via.placeholder.com/300?text=No+Image';
  }

  // Find largest available image
  const sizes = ['mega', 'extralarge', 'large', 'medium', 'small'];
  for (const size of sizes) {
    const img = images.find((i) => i.size === size);
    if (img && img['#text']) {
      return img['#text'];
    }
  }

  return 'https://via.placeholder.com/300?text=No+Image';
};

const getYear = (): number => {
  const currentYear = new Date().getFullYear();
  return currentYear;
};

// Transform Last.fm album to our Album type
export const transformAlbum = (lastFmAlbum: LastFmAlbum, artistName?: string): Album => {
  const albumName = lastFmAlbum.name;
  const artist = artistName || lastFmAlbum.artist;
  const id = lastFmAlbum.mbid || uuidv4();

  return {
    id,
    name: albumName,
    artistId: uuidv4(),
    artistName: artist,
    year: getYear(),
    cover: getImageUrl(lastFmAlbum.image),
    playCount: lastFmAlbum.playcount ? parseInt(lastFmAlbum.playcount, 10) : undefined
  };
};

// Transform Last.fm track to our Song type
export const transformTrack = (lastFmTrack: LastFmTrack, albumName?: string, albumId?: string): Song => {
  const trackName = lastFmTrack.name;
  const artist = lastFmTrack.artist;
  const album = albumName || lastFmTrack.album?.['#text'] || 'Unknown Album';
  // Generate unique UUID for each song to ensure uniqueness
  const id = uuidv4();

  // Parse duration (Last.fm provides in seconds as string)
  const duration = lastFmTrack.duration ? parseInt(lastFmTrack.duration, 10) : 0;

  return {
    id,
    title: trackName,
    albumId: albumId || uuidv4(),
    albumName: album,
    artistId: uuidv4(),
    artistName: artist,
    duration,
    playCount: lastFmTrack.playcount ? parseInt(lastFmTrack.playcount, 10) : undefined,
    trackNumber: lastFmTrack['@attr']?.position ? parseInt(lastFmTrack['@attr'].position, 10) : undefined
  };
};
