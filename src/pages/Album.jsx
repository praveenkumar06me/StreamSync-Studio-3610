import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import TrackList from '../components/common/TrackList';

const Album = () => {
  const { id } = useParams();

  // Mockup album data
  const album = {
    id,
    title: 'Album Title',
    artist: 'Artist Name',
    releaseYear: '2024',
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
            src={album.coverImage}
            alt={album.title}
            className="w-60 h-60 shadow-2xl"
          />
          <div>
            <p className="text-sm text-gray-300 uppercase">Album</p>
            <h1 className="text-5xl font-bold mt-2 mb-2">{album.title}</h1>
            <div className="flex items-center text-gray-300">
              <span className="font-medium text-white">{album.artist}</span>
              <span className="mx-2">•</span>
              <span>{album.releaseYear}</span>
            </div>
          </div>
        </div>

        <TrackList tracks={album.tracks} />
      </div>
    </motion.div>
  );
};

export default Album;