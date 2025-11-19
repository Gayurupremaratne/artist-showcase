import { apiClient } from './config';
import { transformAlbum, transformTrack } from './transformers';
import type { Album, AlbumDetail } from '../types';

interface LastFmResponse {
  album?: {
    name: string;
    artist: string;
    mbid?: string;
    url: string;
    image?: Array<{ '#text': string; size: string }>;
    playcount?: string;
    tracks?: {
      track?:
        | Array<{
            name: string;
            artist: { '#text': string };
            duration?: string;
            playcount?: string;
            '@attr'?: { rank?: string };
          }>
        | {
            name: string;
            artist: { '#text': string };
            duration?: string;
            playcount?: string;
            '@attr'?: { rank?: string };
          };
    };
  };
  topalbums?: {
    album?:
      | Array<{
          name: string;
          artist: { name: string };
          mbid?: string;
          url: string;
          image?: Array<{ '#text': string; size: string }>;
          playcount?: string;
        }>
      | {
          name: string;
          artist: { name: string };
          mbid?: string;
          url: string;
          image?: Array<{ '#text': string; size: string }>;
          playcount?: string;
        };
    '@attr'?: {
      page?: string;
      perPage?: string;
      totalPages?: string;
      total?: string;
    };
  };
}

export interface AlbumsResponse {
  albums: Album[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const albumsApi = {
  getAlbumsByArtist: async (artistName: string, page: number = 1, limit: number = 10): Promise<AlbumsResponse> => {
    try {
      const response = await apiClient.get<LastFmResponse>('/', {
        params: {
          method: 'artist.gettopalbums',
          artist: artistName,
          page,
          limit
        }
      });

      const topalbums = response.data.topalbums;
      const albums = topalbums?.album;
      if (!albums) {
        return {
          albums: [],
          totalPages: 0,
          currentPage: page,
          total: 0
        };
      }

      // Handle both single album and array of albums
      const albumArray = Array.isArray(albums) ? albums : [albums];

      const transformedAlbums = albumArray
        .filter((album) => album.name && album.name !== '(null)')
        .map((album) =>
          transformAlbum({
            name: album.name,
            artist: album.artist.name,
            mbid: album.mbid,
            url: album.url,
            image: album.image as
              | Array<{
                  '#text': string;
                  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | '';
                }>
              | undefined,
            playcount: album.playcount
          })
        );

      const pagination = topalbums['@attr'];
      const totalPages = pagination?.totalPages ? parseInt(pagination.totalPages, 10) : 0;
      const total = pagination?.total ? parseInt(pagination.total, 10) : 0;

      return {
        albums: transformedAlbums,
        totalPages,
        currentPage: page,
        total
      };
    } catch (error) {
      throw new Error(`Failed to fetch albums: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  getAlbumDetail: async (albumName: string, artistName: string): Promise<AlbumDetail> => {
    try {
      const response = await apiClient.get<LastFmResponse>('/', {
        params: {
          method: 'album.getinfo',
          album: albumName,
          artist: artistName
        }
      });

      const albumData = response.data.album;
      if (!albumData) {
        throw new Error('Album not found');
      }

      const album = transformAlbum({
        name: albumData.name,
        artist: albumData.artist,
        mbid: albumData.mbid,
        url: albumData.url,
        image: albumData.image as
          | Array<{
              '#text': string;
              size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | '';
            }>
          | undefined,
        playcount: albumData.playcount
      });

      // Transform tracks
      let songs: ReturnType<typeof transformTrack>[] = [];
      if (albumData.tracks?.track) {
        const tracks = albumData.tracks.track;
        const trackArray = Array.isArray(tracks) ? tracks : [tracks];

        songs = trackArray.map((track) =>
          transformTrack(
            {
              name: track.name,
              artist: track.artist['#text'] || albumData.artist,
              album: { '#text': albumData.name },
              mbid: undefined,
              url: albumData.url,
              duration: track.duration,
              playcount: track.playcount,
              '@attr': track['@attr']
            },
            albumData.name,
            album.id
          )
        );
      }

      return {
        ...album,
        songs
      };
    } catch (error) {
      throw new Error(`Failed to fetch album details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};
