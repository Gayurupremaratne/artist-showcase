# Hosted Application

https://artist-showcase-react-h1wgmy6rv-gayuru-premaratnes-projects.vercel.app/

# Artist Showcase

A modern, elegant web application for showcasing albums, songs, and artists with a beautiful UI built with React, TypeScript, Chakra UI, and Zustand.

## Features

### 🎵 Album Overview

- Display all albums with cover art, name, and year
- Sort albums by name or year
- Responsive grid layout

### 📀 Album Detail View

- View detailed album information
- Complete track list with all songs
- Add songs to favorites directly from album view

### 🔍 Search

- Search for songs and albums
- Real-time search with debouncing
- Separate tabs for albums and songs results

### ⭐ Favorites

- Add songs to favorites from anywhere in the app
- View all favorited songs with details (title, duration, album)
- Search within favorites
- Remove songs from favorites
- Click songs to navigate to album details

### 📊 Best Played Graph

- Visualize most-played tracks on albums
- Search for albums
- Interactive bar chart showing play counts
- Click albums to view their play statistics

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Chakra UI** - Component library
- **CSS Modules** - Component-scoped styling
- **Zustand** - State management
- **Axios** - HTTP client
- **React Router** - Routing
- **Recharts** - Chart library
- **React Icons** - Icon library
- **Vitest** - Testing framework
- **Testing Library** - React component testing utilities
- **UUID** - Unique ID generation
- **Husky** - Git hooks

## Architecture

### Clean Architecture Principles

- **Types** (`src/types/`) - TypeScript interfaces and types
- **API Layer** (`src/api/`) - Centralized API calls with error handling
- **Store** (`src/store/`) - Zustand state management
- **Components** (`src/components/`) - Reusable UI components
- **Pages** (`src/pages/`) - Page-level components
- **Hooks** (`src/hooks/`) - Custom React hooks

### Key Features

- ✅ **Hybrid Styling** - CSS Modules for component-scoped styles combined with Chakra UI
- ✅ **TypeScript Mastery** - Full type safety throughout
- ✅ **Clean Architecture** - Separation of concerns
- ✅ **Reusable Components** - DRY principle with organized component folders
- ✅ **Error Handling** - Comprehensive error boundaries and API error handling
- ✅ **Environment Config** - Environment variables for API configuration
- ✅ **Lazy Loading** - Code splitting for optimal performance
- ✅ **Memoization** - React.memo and useMemo for performance
- ✅ **Responsive Design** - Mobile-first responsive layout
- ✅ **Testing Setup** - Vitest with Testing Library for component tests
- ✅ **Code Quality** - ESLint, Prettier, and Husky git hooks configured
- ✅ **Pagination** - Album pagination support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Last.fm API key (get one at [last.fm/api](https://www.last.fm/api/))

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd artist-showcase
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp env.example .env
```

Edit `.env` and set your Last.fm API key:

```
VITE_LASTFM_API_KEY=your_api_key_here
```

The application is pre-configured with a demo API key, but you should use your own for production.

4. Start the development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

## API Integration

This application uses the [Last.fm API](https://www.last.fm/api/) to fetch music data. The API integration includes:

### Last.fm API Methods Used

- **artist.gettopalbums** - Get top albums for an artist
- **album.getinfo** - Get detailed album information with track list
- **album.search** - Search for albums
- **track.search** - Search for tracks
- **chart.gettopartists** - Get popular artists (for album overview)

### Data Transformation

The application transforms Last.fm API responses to match our internal data structures using the `transformers.ts` module. This module handles:

- Image URL extraction from Last.fm's image arrays (selecting the largest available size)
- ID generation using UUID when Last.fm MBID is not available
- Year extraction (currently defaults to current year as Last.fm doesn't always provide this)
- Play count parsing from strings to numbers
- Track duration parsing from strings to numbers

**Album:**

```typescript
{
  id: string;              // Last.fm mbid or generated UUID
  name: string;            // Album name from Last.fm
  artistId: string;        // Generated UUID
  artistName: string;      // Artist name from Last.fm
  year: number;           // Current year (Last.fm doesn't always provide this)
  cover: string;          // Album cover image URL from Last.fm (largest available size)
  playCount?: number;     // Play count from Last.fm (parsed from string)
}
```

**Song:**

```typescript
{
  id: string;              // Generated UUID for uniqueness
  title: string;          // Track name from Last.fm
  albumId: string;        // Generated UUID or album's ID
  albumName: string;      // Album name from Last.fm
  artistId: string;       // Generated UUID
  artistName: string;      // Artist name from Last.fm
  duration: number;        // Duration in seconds from Last.fm (parsed from string)
  playCount?: number;      // Play count from Last.fm (parsed from string)
  trackNumber?: number;    // Track position from Last.fm (parsed from string)
}
```

### API Configuration

The Last.fm API is configured in `src/api/config.ts`:

- Base URL: `https://ws.audioscrobbler.com/2.0/`
- API key is read from environment variable `VITE_LASTFM_API_KEY`
- All requests include `format=json` parameter
- Error handling for Last.fm API error responses

## Project Structure

```
src/
├── api/                    # API layer with axios
│   ├── config.ts           # Axios configuration
│   ├── albums.ts           # Album API calls
│   ├── search.ts           # Search API calls
│   ├── transformers.ts     # Last.fm API response transformers
│   ├── albums.test.ts      # Album API tests
│   └── search.test.ts      # Search API tests
├── components/             # Reusable UI components
│   ├── AlbumCard/
│   │   ├── AlbumCard.tsx
│   │   └── AlbumCard.module.css
│   ├── SongCard/
│   │   ├── SongCard.tsx
│   │   └── SongCard.module.css
│   ├── SearchBar/
│   │   ├── SearchBar.tsx
│   │   └── SearchBar.module.css
│   ├── LoadingSpinner/
│   │   ├── LoadingSpinner.tsx
│   │   └── LoadingSpinner.module.css
│   ├── ErrorMessage/
│   │   ├── ErrorMessage.tsx
│   │   └── ErrorMessage.module.css
│   ├── Layout/
│   │   ├── Layout.tsx
│   │   └── Layout.module.css
│   ├── Pagination/
│   │   ├── Pagination.tsx
│   │   └── Pagination.module.css
│   └── index.ts            # Component exports
├── hooks/                  # Custom React hooks
│   └── useDebounce.ts
├── pages/                  # Page components
│   ├── AlbumOverview/
│   │   ├── AlbumOverview.tsx
│   │   └── AlbumOverview.module.css
│   ├── AlbumDetails/
│   │   ├── AlbumDetail.tsx
│   │   └── AlbumDetail.module.css
│   ├── Search/
│   │   ├── Search.tsx
│   │   └── Search.module.css
│   ├── Favorites/
│   │   ├── Favorites.tsx
│   │   └── Favorites.module.css
│   ├── BestPlayedGraph/
│   │   ├── BestPlayedGraph.tsx
│   │   └── BestPlayedGraph.module.css
│   └── index.ts            # Page exports
├── store/                  # Zustand stores
│   └── favoritesStore.ts
├── test/                   # Test configuration
│   └── setup.ts            # Vitest setup
├── types/                  # TypeScript types
│   └── index.ts
├── App.tsx                 # Main app component with routing
└── main.tsx                # Entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes type checking)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Run tests with coverage report

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

### Testing

```bash
npm run test
```

The project uses Vitest for testing with Testing Library for React component tests. Test files are located alongside the code they test (e.g., `albums.test.ts` in the `api` directory).

### Type Checking

```bash
npm run build
```

Type checking is automatically performed during the build process.

## Features Implementation Details

### Favorites

- Favorites are persisted to localStorage using Zustand's persist middleware
- Favorites can be added/removed from:
  - Album detail view
  - Search results
  - Favorites page itself

### Performance Optimizations

- Lazy loading of page components with React.lazy
- React.memo for component memoization
- useMemo for expensive computations
- Debounced search queries (custom useDebounce hook)
- Code splitting with React.lazy
- CSS Modules for optimized styling (scoped styles, no global conflicts)

### Pagination

- Album overview supports pagination through the Last.fm API
- Pagination component provides navigation controls
- Page state is managed per request

### Error Handling

- API error interceptors in axios configuration
- Error boundaries for React error handling
- User-friendly error messages via ErrorMessage component
- Comprehensive error handling in API layer

### Git Hooks

- Husky configured for pre-commit and pre-push hooks
- Ensures code quality before commits and pushes

## License

MIT
