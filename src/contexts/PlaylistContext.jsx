import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([
    // Add some initial playlists for testing
    {
      id: 'playlist-1',
      name: 'My Favorite Songs',
      description: 'A collection of my favorite tracks',
      tracks: [],
      creator: 'user1',
      isCollaborative: false,
      collaborators: [],
      createdAt: new Date().toISOString(),
      coverImage: 'https://picsum.photos/400',
    },
    {
      id: 'playlist-2',
      name: 'Collaborative Mix',
      description: 'A shared playlist with friends',
      tracks: [],
      creator: 'user1',
      isCollaborative: true,
      collaborators: ['user2', 'user3'],
      createdAt: new Date().toISOString(),
      coverImage: 'https://picsum.photos/401',
    }
  ]);
  const [likedSongs, setLikedSongs] = useState([]);

  const createPlaylist = (name, description = '', isCollaborative = false) => {
    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name,
      description,
      tracks: [],
      creator: user?.id || 'guest',
      isCollaborative,
      collaborators: [],
      createdAt: new Date().toISOString(),
      coverImage: 'https://picsum.photos/400',
    };
    setPlaylists([...playlists, newPlaylist]);
    return newPlaylist.id;
  };

  const updatePlaylist = (playlistId, updates) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId ? { ...playlist, ...updates } : playlist
    ));
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
  };

  const addToPlaylist = (playlistId, track) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          tracks: [...playlist.tracks, { ...track, addedAt: new Date().toISOString() }]
        };
      }
      return playlist;
    }));
  };

  const removeFromPlaylist = (playlistId, trackId) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          tracks: playlist.tracks.filter(track => track.id !== trackId)
        };
      }
      return playlist;
    }));
  };

  const toggleLike = (track) => {
    setLikedSongs(prev => {
      const isLiked = prev.some(t => t.id === track.id);
      if (isLiked) {
        return prev.filter(t => t.id !== track.id);
      }
      return [...prev, { ...track, likedAt: new Date().toISOString() }];
    });
  };

  const isLiked = (trackId) => {
    return likedSongs.some(track => track.id === trackId);
  };

  const addCollaborator = (playlistId, userId) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId && playlist.isCollaborative) {
        return {
          ...playlist,
          collaborators: [...playlist.collaborators, userId]
        };
      }
      return playlist;
    }));
  };

  const removeCollaborator = (playlistId, userId) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          collaborators: playlist.collaborators.filter(id => id !== userId)
        };
      }
      return playlist;
    }));
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        likedSongs,
        createPlaylist,
        updatePlaylist,
        deletePlaylist,
        addToPlaylist,
        removeFromPlaylist,
        toggleLike,
        isLiked,
        addCollaborator,
        removeCollaborator,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};