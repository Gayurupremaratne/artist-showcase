import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchApi } from './search';
import { apiClient } from './config';

// Mock the apiClient
vi.mock('./config', () => ({
  apiClient: {
    get: vi.fn()
  }
}));

describe('searchApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('search', () => {
    it('searches and returns albums and songs', async () => {
      const mockAlbumsResponse = {
        data: {
          results: {
            albummatches: {
              album: [
                {
                  name: 'Album 1',
                  artist: 'Artist 1',
                  mbid: 'mbid-1',
                  url: 'https://last.fm/album1',
                  image: [
                    {
                      '#text': 'https://example.com/image1.jpg',
                      size: 'large'
                    }
                  ]
                }
              ]
            }
          }
        }
      };

      const mockTracksResponse = {
        data: {
          results: {
            trackmatches: {
              track: [
                {
                  name: 'Song 1',
                  artist: 'Artist 1',
                  mbid: 'track-mbid-1',
                  url: 'https://last.fm/track1',
                  duration: '240',
                  playcount: '1000'
                }
              ]
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockAlbumsResponse).mockResolvedValueOnce(mockTracksResponse);

      const result = await searchApi.search('test query');

      expect(apiClient.get).toHaveBeenCalledTimes(2);
      expect(apiClient.get).toHaveBeenNthCalledWith(1, '/', {
        params: {
          method: 'album.search',
          album: 'test query',
          limit: 20
        }
      });
      expect(apiClient.get).toHaveBeenNthCalledWith(2, '/', {
        params: {
          method: 'track.search',
          track: 'test query',
          limit: 20
        }
      });

      expect(result.albums).toHaveLength(1);
      expect(result.albums[0].name).toBe('Album 1');
      expect(result.albums[0].artistName).toBe('Artist 1');

      expect(result.songs).toHaveLength(1);
      expect(result.songs[0].title).toBe('Song 1');
      expect(result.songs[0].artistName).toBe('Artist 1');
      expect(result.songs[0].duration).toBe(240);
      expect(result.songs[0].playCount).toBe(1000);
    });

    it('handles single album result', async () => {
      const mockAlbumsResponse = {
        data: {
          results: {
            albummatches: {
              album: {
                name: 'Single Album',
                artist: 'Artist 1',
                url: 'https://last.fm/album1'
              }
            }
          }
        }
      };

      const mockTracksResponse = {
        data: {
          results: {
            trackmatches: {
              track: []
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockAlbumsResponse).mockResolvedValueOnce(mockTracksResponse);

      const result = await searchApi.search('test');

      expect(result.albums).toHaveLength(1);
      expect(result.albums[0].name).toBe('Single Album');
      expect(result.songs).toHaveLength(0);
    });

    it('handles single track result', async () => {
      const mockAlbumsResponse = {
        data: {
          results: {
            albummatches: {
              album: []
            }
          }
        }
      };

      const mockTracksResponse = {
        data: {
          results: {
            trackmatches: {
              track: {
                name: 'Single Song',
                artist: 'Artist 1',
                url: 'https://last.fm/track1',
                duration: '180'
              }
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockAlbumsResponse).mockResolvedValueOnce(mockTracksResponse);

      const result = await searchApi.search('test');

      expect(result.albums).toHaveLength(0);
      expect(result.songs).toHaveLength(1);
      expect(result.songs[0].title).toBe('Single Song');
    });

    it('filters out null albums and tracks', async () => {
      const mockAlbumsResponse = {
        data: {
          results: {
            albummatches: {
              album: [
                {
                  name: 'Valid Album',
                  artist: 'Artist 1',
                  url: 'https://last.fm/album1'
                },
                {
                  name: '(null)',
                  artist: 'Artist 1',
                  url: 'https://last.fm/album2'
                }
              ]
            }
          }
        }
      };

      const mockTracksResponse = {
        data: {
          results: {
            trackmatches: {
              track: [
                {
                  name: 'Valid Song',
                  artist: 'Artist 1',
                  url: 'https://last.fm/track1'
                },
                {
                  name: '(null)',
                  artist: 'Artist 1',
                  url: 'https://last.fm/track2'
                }
              ]
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockAlbumsResponse).mockResolvedValueOnce(mockTracksResponse);

      const result = await searchApi.search('test');

      expect(result.albums).toHaveLength(1);
      expect(result.albums[0].name).toBe('Valid Album');
      expect(result.songs).toHaveLength(1);
      expect(result.songs[0].title).toBe('Valid Song');
    });

    it('returns empty arrays when no results found', async () => {
      const mockAlbumsResponse = {
        data: {
          results: {}
        }
      };

      const mockTracksResponse = {
        data: {
          results: {}
        }
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockAlbumsResponse).mockResolvedValueOnce(mockTracksResponse);

      const result = await searchApi.search('nonexistent');

      expect(result.albums).toEqual([]);
      expect(result.songs).toEqual([]);
    });

    it('handles missing results object', async () => {
      const mockAlbumsResponse = {
        data: {}
      };

      const mockTracksResponse = {
        data: {}
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockAlbumsResponse).mockResolvedValueOnce(mockTracksResponse);

      const result = await searchApi.search('test');

      expect(result.albums).toEqual([]);
      expect(result.songs).toEqual([]);
    });

    it('handles tracks without duration and playcount', async () => {
      const mockAlbumsResponse = {
        data: {
          results: {
            albummatches: {
              album: []
            }
          }
        }
      };

      const mockTracksResponse = {
        data: {
          results: {
            trackmatches: {
              track: [
                {
                  name: 'Song 1',
                  artist: 'Artist 1',
                  url: 'https://last.fm/track1'
                }
              ]
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockAlbumsResponse).mockResolvedValueOnce(mockTracksResponse);

      const result = await searchApi.search('test');

      expect(result.songs[0].duration).toBe(0);
      expect(result.songs[0].playCount).toBeUndefined();
    });

    it('throws error when album search fails', async () => {
      const error = new Error('Network error');
      vi.mocked(apiClient.get).mockRejectedValueOnce(error);

      await expect(searchApi.search('test')).rejects.toThrow('Failed to search: Network error');
    });

    it('throws error when track search fails', async () => {
      const mockAlbumsResponse = {
        data: {
          results: {
            albummatches: {
              album: []
            }
          }
        }
      };

      const error = new Error('Network error');
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockAlbumsResponse).mockRejectedValueOnce(error);

      await expect(searchApi.search('test')).rejects.toThrow('Failed to search: Network error');
    });

    it('handles albums without images', async () => {
      const mockAlbumsResponse = {
        data: {
          results: {
            albummatches: {
              album: [
                {
                  name: 'Album 1',
                  artist: 'Artist 1',
                  url: 'https://last.fm/album1'
                }
              ]
            }
          }
        }
      };

      const mockTracksResponse = {
        data: {
          results: {
            trackmatches: {
              track: []
            }
          }
        }
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockAlbumsResponse).mockResolvedValueOnce(mockTracksResponse);

      const result = await searchApi.search('test');

      expect(result.albums[0].cover).toContain('placeholder');
    });
  });
});
