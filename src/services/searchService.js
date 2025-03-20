const MOCK_DATA = {
  artists: [
    { id: '1', name: 'Artist 1', image: 'https://picsum.photos/200', type: 'artist', genres: ['Pop', 'Rock'] },
    { id: '2', name: 'Artist 2', image: 'https://picsum.photos/201', type: 'artist', genres: ['Jazz', 'Blues'] },
  ],
  albums: [
    { id: '1', title: 'Album 1', artist: 'Artist 1', image: 'https://picsum.photos/202', type: 'album', year: '2024' },
    { id: '2', title: 'Album 2', artist: 'Artist 2', image: 'https://picsum.photos/203', type: 'album', year: '2023' },
  ],
  tracks: [
    { id: '1', title: 'Track 1', artist: 'Artist 1', album: 'Album 1', image: 'https://picsum.photos/204', type: 'track', duration: '3:45' },
    { id: '2', title: 'Track 2', artist: 'Artist 2', album: 'Album 2', image: 'https://picsum.photos/205', type: 'track', duration: '4:20' },
  ],
  genres: ['Pop', 'Rock', 'Jazz', 'Blues', 'Electronic', 'Classical', 'Hip Hop', 'R&B'],
};

export const searchContent = async (query, filters = []) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (!query) return { artists: [], albums: [], tracks: [] };

  const searchResults = {
    artists: MOCK_DATA.artists.filter(artist => 
      artist.name.toLowerCase().includes(query.toLowerCase())),
    albums: MOCK_DATA.albums.filter(album => 
      album.title.toLowerCase().includes(query.toLowerCase())),
    tracks: MOCK_DATA.tracks.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase())),
  };

  if (filters.length > 0) {
    return filters.reduce((acc, filter) => {
      acc[filter] = searchResults[filter];
      return acc;
    }, {});
  }

  return searchResults;
};

export const getRecommendations = async (userPreferences) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Mock recommendations based on user preferences
  return {
    topPicks: MOCK_DATA.tracks.slice(0, 4),
    similarArtists: MOCK_DATA.artists,
    forYou: MOCK_DATA.tracks,
  };
};