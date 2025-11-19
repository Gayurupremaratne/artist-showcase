import { describe, it, expect, vi, beforeEach } from 'vitest';
import { albumsApi } from './albums';
import { apiClient } from './config';

// Mock the apiClient
vi.mock('./config', () => ({
  apiClient: {
    get: vi.fn()
  }
}));

describe('albumsApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAlbumsByArtist', () => {
    it('fetches and transforms albums successfully', async () => {
      const mockResponse = {
        data: {
          topalbums: {
            album: [
              {
                name: 'Album 1',
                artist: { name: 'Artist 1' },
                mbid: 'mbid-1',
                url: 'https://last.fm/album1',
                image: [
                  {
                    '#text': 'https://example.com/image1.jpg',
                    size: 'large'
                  }
                ],
                playcount: '1000'
              },
              {
                name: 'Album 2',
                artist: { name: 'Artist 1' },
                mbid: 'mbid-2',
                url: 'https://last.fm/album2',
                image: [
                  {
                    '#text': 'https://example.com/image2.jpg',
                    size: 'large'
                  }
                ],
                playcount: '500'
              }
            ],
            '@attr': {
              page: '1',
              perPage: '10',
              totalPages: '5',
              total: '50'
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      const result = await albumsApi.getAlbumsByArtist('Artist 1', 1, 10);

      expect(apiClient.get).toHaveBeenCalledWith('/', {
        params: {
          method: 'artist.gettopalbums',
          artist: 'Artist 1',
          page: 1,
          limit: 10
        }
      });

      expect(result.albums).toHaveLength(2);
      expect(result.albums[0].name).toBe('Album 1');
      expect(result.albums[0].artistName).toBe('Artist 1');
      expect(result.albums[0].playCount).toBe(1000);
      expect(result.totalPages).toBe(5);
      expect(result.currentPage).toBe(1);
      expect(result.total).toBe(50);
    });

    it('handles single album response', async () => {
      const mockResponse = {
        data: {
          topalbums: {
            album: {
              name: 'Single Album',
              artist: { name: 'Artist 1' },
              mbid: 'mbid-1',
              url: 'https://last.fm/album1',
              image: [
                {
                  '#text': 'https://example.com/image1.jpg',
                  size: 'large'
                }
              ],
              playcount: '100'
            },
            '@attr': {
              page: '1',
              perPage: '10',
              totalPages: '1',
              total: '1'
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      const result = await albumsApi.getAlbumsByArtist('Artist 1');

      expect(result.albums).toHaveLength(1);
      expect(result.albums[0].name).toBe('Single Album');
    });

    it('filters out null albums', async () => {
      const mockResponse = {
        data: {
          topalbums: {
            album: [
              {
                name: 'Valid Album',
                artist: { name: 'Artist 1' },
                url: 'https://last.fm/album1'
              },
              {
                name: '(null)',
                artist: { name: 'Artist 1' },
                url: 'https://last.fm/album2'
              }
            ],
            '@attr': {
              page: '1',
              perPage: '10',
              totalPages: '1',
              total: '1'
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      const result = await albumsApi.getAlbumsByArtist('Artist 1');

      expect(result.albums).toHaveLength(1);
      expect(result.albums[0].name).toBe('Valid Album');
    });

    it('returns empty array when no albums found', async () => {
      const mockResponse = {
        data: {
          topalbums: {}
        }
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      const result = await albumsApi.getAlbumsByArtist('Unknown Artist');

      expect(result.albums).toEqual([]);
      expect(result.totalPages).toBe(0);
      expect(result.currentPage).toBe(1);
      expect(result.total).toBe(0);
    });

    it('handles missing pagination data', async () => {
      const mockResponse = {
        data: {
          topalbums: {
            album: [
              {
                name: 'Album 1',
                artist: { name: 'Artist 1' },
                url: 'https://last.fm/album1'
              }
            ]
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      const result = await albumsApi.getAlbumsByArtist('Artist 1');

      expect(result.albums).toHaveLength(1);
      expect(result.totalPages).toBe(0);
      expect(result.total).toBe(0);
    });

    it('handles albums without playcount', async () => {
      const mockResponse = {
        data: {
          topalbums: {
            album: [
              {
                name: 'Album 1',
                artist: { name: 'Artist 1' },
                url: 'https://last.fm/album1'
              }
            ],
            '@attr': {
              page: '1',
              perPage: '10',
              totalPages: '1',
              total: '1'
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      const result = await albumsApi.getAlbumsByArtist('Artist 1');

      expect(result.albums[0].playCount).toBeUndefined();
    });

    it('uses default page and limit when not provided', async () => {
      const mockResponse = {
        data: {
          topalbums: {
            album: [],
            '@attr': {
              page: '1',
              perPage: '10',
              totalPages: '0',
              total: '0'
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      await albumsApi.getAlbumsByArtist('Artist 1');

      expect(apiClient.get).toHaveBeenCalledWith('/', {
        params: {
          method: 'artist.gettopalbums',
          artist: 'Artist 1',
          page: 1,
          limit: 10
        }
      });
    });

    it('throws error when API call fails', async () => {
      const error = new Error('Network error');
      vi.mocked(apiClient.get).mockRejectedValue(error);

      await expect(albumsApi.getAlbumsByArtist('Artist 1')).rejects.toThrow('Failed to fetch albums: Network error');
    });

    it('handles albums without images', async () => {
      const mockResponse = {
        data: {
          topalbums: {
            album: [
              {
                name: 'Album 1',
                artist: { name: 'Artist 1' },
                url: 'https://last.fm/album1'
              }
            ],
            '@attr': {
              page: '1',
              perPage: '10',
              totalPages: '1',
              total: '1'
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      const result = await albumsApi.getAlbumsByArtist('Artist 1');

      expect(result.albums[0].cover).toContain('placeholder');
    });
  });
});
