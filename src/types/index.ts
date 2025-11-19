export interface Artist {
  id: string;
  name: string;
  image?: string;
}

export interface Album {
  id: string;
  name: string;
  artistId: string;
  artistName: string;
  year: number;
  cover: string;
  playCount?: number;
}

export interface Song {
  id: string;
  title: string;
  albumId: string;
  albumName: string;
  artistId: string;
  artistName: string;
  duration: number; // in seconds
  playCount?: number;
  trackNumber?: number;
}

export interface AlbumDetail extends Album {
  songs: Song[];
}

export type SortOption = 'name' | 'year';

export interface SearchResult {
  albums: Album[];
  songs: Song[];
}
