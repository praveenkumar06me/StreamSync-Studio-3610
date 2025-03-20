import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import TrackList from '../components/common/TrackList';

const Artist = () => {
  const { id } = useParams();

  // Mockup artist data
  const artist = {
    id,
    name: 'Artist Name',
    coverImage: 'https://picsum.photos/800/400',
    monthlyListeners: '1,234,567',
    topTracks: []
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-full"
    >
      <div 
        className="h-[400px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${artist.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark" />
        <div className="absolute bottom-0 p-8">
          <h1 className="text-6xl font-bold mb-4">{artist.name}</h1>
          <p className="text-gray-300">{artist.monthlyListeners} monthly listeners</p>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Popular Tracks</h2>
        <TrackList tracks={artist.topTracks} />
      </div>
    </motion.div>
  );
};

export default Artist;