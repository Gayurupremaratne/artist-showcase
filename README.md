# Hosted Application

https://artist-showcase-react-h1wgmy6rv-gayuru-premaratnes-projects.vercel.app/

# Artist Showcase

A modern, elegant web application for showcasing albums, songs, and artists with a beautiful UI built with React, TypeScript, Chakra UI, and Zustand.

## Features

### 🎵 Album Overview

- Display all albums with cover art, name, and year
- Sort albums by name or year
- Responsive grid layout
- Pagination support (10 albums per page)
- Configurable artist via `VITE_ARTIST_NAME` environment variable

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

## Routing

The application uses React Router for navigation with the following routes:

- `/` - Album Overview page (default)
- `/albums/:albumName/:artistName` - Album Detail page (dynamic route with URL-encoded album and artist names)
- `/search` - Search page for albums and songs
- `/favorites` - Favorites page displaying all favorited songs
- `/graph` - Best Played Graph page with play statistics visualization

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite (Rolldown)** - Build tool and dev server (using rolldown-vite for faster builds)
- **Chakra UI** - Component library
- **CSS Modules** - Component-scoped styling
- **Chakra UI sx prop** - TypeScript-based styling with Chakra UI's style system
- **Zustand** - State management
- **Axios** - HTTP client
- **React Router** - Routing
- **Recharts** - Chart library
- **React Icons** - Icon library
- **Vitest** - Testing framework
- **Testing Library** - React component testing utilities
- **UUID** - Unique ID generation
- **Husky** - Git hooks
- **Emotion** - CSS-in-JS runtime (required by Chakra UI)
- **Framer Motion** - Animation library (required by Chakra UI)

## Architecture

### Clean Architecture Principles

- **Types** (`src/types/`) - TypeScript interfaces and types
- **API Layer** (`src/api/`) - Centralized API calls with error handling
- **Store** (`src/store/`) - Zustand state management
- **Components** (`src/components/`) - Reusable UI components
- **Pages** (`src/pages/`) - Page-level components
- **Hooks** (`src/hooks/`) - Custom React hooks

### Key Features

- ✅ **Hybrid Styling** - CSS Modules for component-scoped styles combined with Chakra UI's `sx` prop and TypeScript style objects (`.styles.ts` files)
- ✅ **TypeScript Mastery** - Full type safety throughout
- ✅ **Clean Architecture** - Separation of concerns
- ✅ **Reusable Components** - DRY principle with organized component folders
- ✅ **Error Handling** - Comprehensive error boundaries and API error handling
- ✅ **Environment Config** - Environment variables for API configuration and artist selection
- ✅ **Lazy Loading** - Code splitting for optimal performance
- ✅ **Memoization** - React.memo and useMemo for performance
- ✅ **Responsive Design** - Mobile-first responsive layout
- ✅ **Testing Setup** - Vitest with Testing Library for component tests
- ✅ **Code Quality** - ESLint, Prettier, and Husky git hooks configured
- ✅ **Pagination** - Album pagination support

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn)
- Last.fm API key (get one at [last.fm/api](https://www.last.fm/api/))

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd artist-showcase
```

2. Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

3. Set up environment variables

```bash
cp env.example .env
```

Edit `.env` and configure the following variables:

```
VITE_LASTFM_BASE_URL=https://ws.audioscrobbler.com/2.0/
VITE_LASTFM_API_KEY=your_api_key_here
VITE_ARTIST_NAME=Your Artist Name
```

- `VITE_LASTFM_BASE_URL` - Last.fm API base URL (defaults to `https://ws.audioscrobbler.com/2.0/`)
- `VITE_LASTFM_API_KEY` - Your Last.fm API key (required)
- `VITE_ARTIST_NAME` - Default artist name to display albums for (defaults to "Kendrick Lamar" if not set)

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

- Base URL: Read from environment variable `VITE_LASTFM_BASE_URL` (defaults to `https://ws.audioscrobbler.com/2.0/`)
- API key: Read from environment variable `VITE_LASTFM_API_KEY`
- All requests include `format=json` parameter
- Request timeout: 15 seconds
- Error handling: Comprehensive interceptors for Last.fm API error responses and network errors

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
├── assets/                 # Static assets
│   ├── logo.png            # Application logo
│   └── react.svg            # React logo
├── components/             # Reusable UI components
│   ├── AlbumCard/
│   │   ├── AlbumCard.tsx
│   │   ├── AlbumCard.module.css
│   │   └── AlbumCard.styles.ts    # Chakra UI style objects
│   ├── SongCard/
│   │   ├── SongCard.tsx
│   │   ├── SongCard.module.css
│   │   └── SongCard.styles.ts
│   ├── SearchBar/
│   │   ├── SearchBar.tsx
│   │   ├── SearchBar.module.css
│   │   └── SearchBar.styles.ts
│   ├── LoadingSpinner/
│   │   ├── LoadingSpinner.tsx
│   │   ├── LoadingSpinner.module.css
│   │   └── LoadingSpinner.styles.ts
│   ├── ErrorMessage/
│   │   ├── ErrorMessage.tsx
│   │   ├── ErrorMessage.module.css
│   │   └── ErrorMessage.styles.ts
│   ├── Layout/
│   │   ├── Layout.tsx
│   │   ├── Layout.module.css
│   │   └── Layout.styles.ts
│   ├── Pagination/
│   │   ├── Pagination.tsx
│   │   ├── Pagination.module.css
│   │   └── Pagination.styles.ts
│   └── index.ts            # Component exports
├── hooks/                  # Custom React hooks
│   └── useDebounce.ts      # Debounce hook for search
├── pages/                  # Page components
│   ├── AlbumOverview/
│   │   ├── AlbumOverview.tsx
│   │   ├── AlbumOverview.module.css
│   │   └── AlbumOverview.styles.ts
│   ├── AlbumDetails/
│   │   ├── AlbumDetail.tsx
│   │   ├── AlbumDetail.module.css
│   │   └── AlbumDetail.styles.ts
│   ├── Search/
│   │   ├── Search.tsx
│   │   ├── Search.module.css
│   │   └── Search.styles.ts
│   ├── Favorites/
│   │   ├── Favorites.tsx
│   │   ├── Favorites.module.css
│   │   └── Favorites.styles.ts
│   ├── BestPlayedGraph/
│   │   ├── BestPlayedGraph.tsx
│   │   ├── BestPlayedGraph.module.css
│   │   └── BestPlayedGraph.styles.ts
│   └── index.ts            # Page exports
├── store/                  # Zustand stores
│   └── favoritesStore.ts   # Favorites state management with persistence
├── test/                   # Test configuration
│   └── setup.ts            # Vitest setup with Testing Library
├── types/                  # TypeScript types
│   └── index.ts            # Type definitions (Album, Song, Artist, etc.)
├── App.tsx                 # Main app component with routing
├── main.tsx                # Entry point
├── index.css               # Global styles
└── vite-env.d.ts           # Vite environment type definitions
```

## Development

### Available Scripts

- `npm run dev` (or `yarn dev`) - Start development server
- `npm run build` (or `yarn build`) - Build for production (includes type checking)
- `npm run preview` (or `yarn preview`) - Preview production build
- `npm run lint` (or `yarn lint`) - Run ESLint
- `npm run lint:fix` (or `yarn lint:fix`) - Fix ESLint errors automatically
- `npm run format` (or `yarn format`) - Format code with Prettier
- `npm run format:check` (or `yarn format:check`) - Check code formatting
- `npm run test` (or `yarn test`) - Run tests with Vitest
- `npm run test:ui` (or `yarn test:ui`) - Run tests with Vitest UI
- `npm run test:coverage` (or `yarn test:coverage`) - Run tests with coverage report

### Linting

```bash
npm run lint
# or
yarn lint
```

### Formatting

```bash
npm run format
# or
yarn format
```

### Testing

```bash
npm run test
# or
yarn test
```

The project uses Vitest for testing with Testing Library for React component tests. Test files are located alongside the code they test (e.g., `albums.test.ts` in the `api` directory).

### Type Checking

```bash
npm run build
# or
yarn build
```

Type checking is automatically performed during the build process using TypeScript compiler (`tsc -b`).

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
- Chakra UI sx prop for efficient style application
- TypeScript style objects for type-safe styling

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
