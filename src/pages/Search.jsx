import { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { motion } from 'framer-motion';
import SearchResults from '../components/search/SearchResults';
import GenreSelector from '../components/discovery/GenreSelector';
import RecommendedTracks from '../components/discovery/RecommendedTracks';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Jazz', 'Electronic', 'Classical', 'Country',
    'Latin', 'Metal', 'Folk', 'Blues', 'Indie', 'K-pop', 'Reggae', 'Soul'
  ];

  // Mock recommended tracks
  const featuredTracks = [
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      image: 'https://picsum.photos/400?random=1',
      duration: '3:20',
      type: 'track'
    },
    {
      id: '2',
      title: 'Stay',
      artist: 'Kid Laroi & Justin Bieber',
      image: 'https://picsum.photos/400?random=2',
      duration: '2:21',
      type: 'track'
    },
    {
      id: '3',
      title: 'As It Was',
      artist: 'Harry Styles',
      image: 'https://picsum.photos/400?random=3',
      duration: '2:47',
      type: 'track'
    },
    {
      id: '4',
      title: 'Bad Habit',
      artist: 'Steve Lacy',
      image: 'https://picsum.photos/400?random=4',
      duration: '3:52',
      type: 'track'
    },
    {
      id: '5',
      title: 'Heat Waves',
      artist: 'Glass Animals',
      image: 'https://picsum.photos/400?random=5',
      duration: '3:59',
      type: 'track'
    }
  ];

  const trendingTracks = [
    {
      id: '6',
      title: 'Anti-Hero',
      artist: 'Taylor Swift',
      image: 'https://picsum.photos/400?random=6',
      duration: '3:20',
      type: 'track'
    },
    {
      id: '7',
      title: 'Unholy',
      artist: 'Sam Smith & Kim Petras',
      image: 'https://picsum.photos/400?random=7',
      duration: '2:36',
      type: 'track'
    },
    {
      id: '8',
      title: 'About Damn Time',
      artist: 'Lizzo',
      image: 'https://picsum.photos/400?random=8',
      duration: '3:11',
      type: 'track'
    },
    {
      id: '9',
      title: 'Late Night Talking',
      artist: 'Harry Styles',
      image: 'https://picsum.photos/400?random=9',
      duration: '2:57',
      type: 'track'
    },
    {
      id: '10',
      title: 'Break My Soul',
      artist: 'Beyoncé',
      image: 'https://picsum.photos/400?random=10',
      duration: '4:38',
      type: 'track'
    }
  ];

  // Mock genre-specific tracks
  const genreTracks = {
    'Pop': featuredTracks,
    'Rock': trendingTracks,
    // Add more genre-specific tracks as needed
  };

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        try {
          // Simulate API call with mock data
          await new Promise(resolve => setTimeout(resolve, 500));
          const results = {
            artists: [
              {
                id: 'a1',
                name: searchQuery + ' Artist',
                image: 'https://picsum.photos/400?random=11',
                type: 'artist',
                genres: ['Pop', 'Rock']
              }
            ],
            albums: [
              {
                id: 'al1',
                title: searchQuery + ' Album',
                artist: 'Various Artists',
                image: 'https://picsum.photos/400?random=12',
                type: 'album',
                year: '2024'
              }
            ],
            tracks: [
              {
                id: 't1',
                title: searchQuery + ' Track',
                artist: 'Unknown Artist',
                image: 'https://picsum.photos/400?random=13',
                type: 'track',
                duration: '3:30'
              }
            ]
          };
          setSearchResults(results);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults({});
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults({});
      }
    };

    const debounceTimeout = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleGenreSelect = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-dark-lighter to-dark">
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-6 sm:mb-8">
            <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to listen to?"
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-dark-lighter rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Browse All</h2>
            <GenreSelector
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreSelect={handleGenreSelect}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : searchQuery ? (
              <SearchResults results={searchResults} />
            ) : (
              <div className="space-y-8 sm:space-y-12">
                <RecommendedTracks
                  tracks={featuredTracks}
                  title="Featured Tracks"
                />
                <RecommendedTracks
                  tracks={trendingTracks}
                  title="Trending Now"
                />
                {selectedGenres.map(genre => (
                  <RecommendedTracks
                    key={genre}
                    tracks={genreTracks[genre] || featuredTracks}
                    title={`Top ${genre}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Search;