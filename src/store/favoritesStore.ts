import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Song } from '../types';

interface FavoritesState {
  favorites: Song[];
  addFavorite: (song: Song) => void;
  removeFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  toggleFavorite: (song: Song) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (song) => {
        set((state) => {
          if (state.favorites.some((f) => f.id === song.id)) {
            return state;
          }
          return { favorites: [...state.favorites, song] };
        });
      },
      removeFavorite: (songId) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== songId)
        }));
      },
      isFavorite: (songId) => {
        return get().favorites.some((f) => f.id === songId);
      },
      toggleFavorite: (song) => {
        const isFavorite = get().isFavorite(song.id);
        if (isFavorite) {
          get().removeFavorite(song.id);
        } else {
          get().addFavorite(song);
        }
      }
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
