import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import TrackList from '../components/common/TrackList';

const Playlist = () => {
  const { id } = useParams();

  // Mockup playlist data
  const playlist = {
    id,
    title: 'My Awesome Playlist',
    description: 'A collection of amazing tracks',
    coverImage: 'https://picsum.photos/400',
    tracks: []
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-full bg-gradient-to-b from-dark-lighter to-dark"
    >
      <div className="p-8">
        <div className="flex items-end space-x-6 mb-8">
          <img
            src={playlist.coverImage}
            alt={playlist.title}
            className="w-60 h-60 shadow-2xl"
          />
          <div>
            <p className="text-sm text-gray-300 uppercase">Playlist</p>
            <h1 className="text-5xl font-bold mt-2 mb-4">{playlist.title}</h1>
            <p className="text-gray-300">{playlist.description}</p>
          </div>
        </div>

        <TrackList tracks={playlist.tracks} />
      </div>
    </motion.div>
  );
};

export default Playlist;