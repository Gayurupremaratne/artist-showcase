import { apiClient } from './config';
import { transformAlbum, transformTrack } from './transformers';
import type { SearchResult } from '../types';

interface LastFmSearchResponse {
  results?: {
    albummatches?: {
      album?:
        | Array<{
            name: string;
            artist: string;
            mbid?: string;
            url: string;
            image?: Array<{ '#text': string; size: string }>;
          }>
        | {
            name: string;
            artist: string;
            mbid?: string;
            url: string;
            image?: Array<{ '#text': string; size: string }>;
          };
    };
    trackmatches?: {
      track?:
        | Array<{
            name: string;
            artist: string;
            mbid?: string;
            url: string;
            duration?: string;
            playcount?: string;
          }>
        | {
            name: string;
            artist: string;
            mbid?: string;
            url: string;
            duration?: string;
            playcount?: string;
          };
    };
  };
}

export const searchApi = {
  search: async (query: string): Promise<SearchResult> => {
    try {
      const albumsResponse = await apiClient.get<LastFmSearchResponse>('/', {
        params: {
          method: 'album.search',
          album: query,
          limit: 20
        }
      });

      const tracksResponse = await apiClient.get<LastFmSearchResponse>('/', {
        params: {
          method: 'track.search',
          track: query,
          limit: 20
        }
      });

      const albumMatches = albumsResponse.data.results?.albummatches?.album;
      const albums = albumMatches
        ? (Array.isArray(albumMatches) ? albumMatches : [albumMatches])
            .filter((album) => album.name && album.name !== '(null)')
            .map((album) =>
              transformAlbum({
                name: album.name,
                artist: album.artist,
                mbid: album.mbid,
                url: album.url,
                image: album.image as
                  | Array<{
                      '#text': string;
                      size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | '';
                    }>
                  | undefined
              })
            )
        : [];

      const trackMatches = tracksResponse.data.results?.trackmatches?.track;
      const songs = trackMatches
        ? (Array.isArray(trackMatches) ? trackMatches : [trackMatches])
            .filter((track) => track.name && track.name !== '(null)')
            .map((track) =>
              transformTrack({
                name: track.name,
                artist: track.artist,
                album: { '#text': '' },
                mbid: track.mbid,
                url: track.url,
                duration: track.duration,
                playcount: track.playcount
              })
            )
        : [];

      return {
        albums,
        songs
      };
    } catch (error) {
      throw new Error(`Failed to search: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};
