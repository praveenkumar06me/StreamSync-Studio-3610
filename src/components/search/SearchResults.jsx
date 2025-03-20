import { motion } from 'framer-motion';
import { BiPlay, BiHeart } from 'react-icons/bi';
import { useMusic } from '../../contexts/MusicContext';

const ResultCard = ({ item, onPlay }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-dark-lighter p-4 rounded-lg group hover:bg-dark-light transition-colors"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.title || item.name}
          className="w-full aspect-square object-cover rounded-md mb-4"
        />
        <button
          onClick={() => onPlay(item)}
          className="absolute bottom-4 right-4 bg-primary p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-105"
        >
          <BiPlay className="text-xl" />
        </button>
      </div>
      <h3 className="font-semibold truncate">
        {item.title || item.name}
      </h3>
      <p className="text-sm text-gray-400 truncate">
        {item.artist || (item.type === 'artist' ? 'Artist' : '')}
      </p>
    </motion.div>
  );
};

const SearchResults = ({ results }) => {
  const { playTrack } = useMusic();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handlePlay = (item) => {
    if (item.type === 'track') {
      playTrack(item);
    }
    // Handle other types (artist, album) navigation
  };

  return (
    <div className="space-y-8">
      {results.artists?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Artists</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {results.artists.map(artist => (
              <ResultCard key={artist.id} item={artist} onPlay={handlePlay} />
            ))}
          </motion.div>
        </section>
      )}

      {results.albums?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Albums</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {results.albums.map(album => (
              <ResultCard key={album.id} item={album} onPlay={handlePlay} />
            ))}
          </motion.div>
        </section>
      )}

      {results.tracks?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Songs</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {results.tracks.map(track => (
              <ResultCard key={track.id} item={track} onPlay={handlePlay} />
            ))}
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default SearchResults;