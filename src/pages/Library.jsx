import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiMusic, BiAlbum, BiPodcast, BiPlus, BiPlay, BiTime } from 'react-icons/bi';
import { usePlaylist } from '../contexts/PlaylistContext';
import PlaylistCard from '../components/library/PlaylistCard';
import CreatePlaylistModal from '../components/library/CreatePlaylistModal';

const AlbumCard = ({ album }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-dark-lighter rounded-lg overflow-hidden group relative"
  >
    <div className="relative aspect-square">
      <img 
        src={album.coverImage}
        alt={album.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity" />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-2 right-2 bg-primary p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <BiPlay className="text-lg sm:text-xl" />
      </motion.button>
    </div>
    <div className="p-3 sm:p-4">
      <h3 className="font-semibold text-sm sm:text-base truncate">{album.title}</h3>
      <p className="text-xs sm:text-sm text-gray-400 truncate">{album.artist}</p>
      <p className="text-xs text-gray-500 mt-1">{album.year}</p>
    </div>
  </motion.div>
);

const PodcastCard = ({ podcast }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-dark-lighter rounded-lg overflow-hidden group relative"
  >
    <div className="relative aspect-square">
      <img
        src={podcast.coverImage}
        alt={podcast.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity" />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-2 right-2 bg-primary p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <BiPlay className="text-lg sm:text-xl" />
      </motion.button>
    </div>
    <div className="p-3 sm:p-4">
      <h3 className="font-semibold text-sm sm:text-base truncate">{podcast.title}</h3>
      <p className="text-xs sm:text-sm text-gray-400 truncate">{podcast.author}</p>
      <div className="flex items-center mt-2 text-xs text-gray-500">
        <BiTime className="mr-1" />
        <span>{podcast.lastEpisode}</span>
      </div>
    </div>
  </motion.div>
);

const Library = () => {
  const [activeTab, setActiveTab] = useState('playlists');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { playlists, createPlaylist, deletePlaylist } = usePlaylist();

  const tabs = [
    { id: 'playlists', label: 'Playlists', icon: BiMusic },
    { id: 'albums', label: 'Albums', icon: BiAlbum },
    { id: 'podcasts', label: 'Podcasts', icon: BiPodcast },
  ];

  // Mock data for albums
  const savedAlbums = [
    {
      id: 1,
      title: "Random Access Memories",
      artist: "Daft Punk",
      year: "2013",
      coverImage: "https://picsum.photos/400?random=1"
    },
    {
      id: 2,
      title: "Future Nostalgia",
      artist: "Dua Lipa",
      year: "2020",
      coverImage: "https://picsum.photos/400?random=2"
    },
    {
      id: 3,
      title: "After Hours",
      artist: "The Weeknd",
      year: "2020",
      coverImage: "https://picsum.photos/400?random=3"
    },
    {
      id: 4,
      title: "Renaissance",
      artist: "Beyoncé",
      year: "2022",
      coverImage: "https://picsum.photos/400?random=4"
    }
  ];

  // Mock data for podcasts
  const savedPodcasts = [
    {
      id: 1,
      title: "Tech Talk Weekly",
      author: "Tech Enthusiasts",
      lastEpisode: "2 days ago",
      coverImage: "https://picsum.photos/400?random=5"
    },
    {
      id: 2,
      title: "True Crime Stories",
      author: "Mystery Network",
      lastEpisode: "1 week ago",
      coverImage: "https://picsum.photos/400?random=6"
    },
    {
      id: 3,
      title: "Health & Wellness",
      author: "Lifestyle Pod",
      lastEpisode: "3 days ago",
      coverImage: "https://picsum.photos/400?random=7"
    },
    {
      id: 4,
      title: "Business Insights",
      author: "Entrepreneur Daily",
      lastEpisode: "Just now",
      coverImage: "https://picsum.photos/400?random=8"
    }
  ];

  const handleCreatePlaylist = (playlistData) => {
    createPlaylist(
      playlistData.name,
      playlistData.description,
      playlistData.isCollaborative
    );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Your Library</h1>
        {activeTab === 'playlists' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-primary rounded-full hover:bg-primary-light text-sm sm:text-base"
          >
            <BiPlus className="mr-1 sm:mr-2" />
            Create Playlist
          </motion.button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center px-3 py-1.5 sm:px-4 sm:py-2 
              rounded-full transition-colors text-sm sm:text-base
              ${activeTab === tab.id 
                ? 'bg-primary text-white' 
                : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
              }
            `}
          >
            <tab.icon className="mr-1 sm:mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6"
      >
        {activeTab === 'playlists' && playlists.map(playlist => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onDelete={deletePlaylist}
            onEdit={(id) => console.log('Edit playlist:', id)}
            onCollaborate={(id) => console.log('Add collaborator:', id)}
          />
        ))}

        {activeTab === 'albums' && savedAlbums.map(album => (
          <AlbumCard key={album.id} album={album} />
        ))}

        {activeTab === 'podcasts' && savedPodcasts.map(podcast => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </motion.div>

      <AnimatePresence>
        {showCreateModal && (
          <CreatePlaylistModal
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreatePlaylist}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;